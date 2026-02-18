import {
    Component, EventEmitter, Input, OnDestroy, Output,
    AfterViewInit, ChangeDetectorRef, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MapLocation {
    lat: number;
    lng: number;
    address: string;
}

declare const google: any;

@Component({
    selector: 'app-map-picker',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './map-picker.component.html',
    styleUrl: './map-picker.component.css'
})
export class MapPickerComponent implements AfterViewInit, OnDestroy {
    @Input() initialLat = 17.0018;
    @Input() initialLng = 81.7877;
    @Output() locationSelected = new EventEmitter<MapLocation>();
    @Output() closed = new EventEmitter<void>();

    private cdr = inject(ChangeDetectorRef);

    searchQuery = '';
    selectedLocation: MapLocation | null = null;

    private map: any = null;
    private marker: any = null;
    private geocoder: any = null;
    private placesService: any = null;
    private mapsReady = false;
    private retryCount = 0;

    ngAfterViewInit() {
        this.waitForMapsAndInit();
    }

    private waitForMapsAndInit() {
        if (typeof google !== 'undefined' && google.maps && google.maps.places) {
            this.initMap();
        } else if (this.retryCount < 30) {
            this.retryCount++;
            setTimeout(() => this.waitForMapsAndInit(), 200);
        }
    }

    private initMap() {
        const container = document.getElementById('mp-map-container');
        if (!container) return;

        const center = { lat: this.initialLat, lng: this.initialLng };

        this.map = new google.maps.Map(container, {
            zoom: 13,
            center,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
        });

        this.marker = new google.maps.Marker({
            position: center,
            map: this.map,
            draggable: true,
            title: 'Selected Location',
            animation: google.maps.Animation.DROP,
        });

        this.geocoder = new google.maps.Geocoder();
        this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
        this.mapsReady = true;

        // Set initial selected location
        this.selectedLocation = { lat: center.lat, lng: center.lng, address: '' };
        this.reverseGeocode(center.lat, center.lng);

        // Click on map to move marker
        this.map.addListener('click', (event: any) => {
            this.marker.setPosition(event.latLng);
            this.updateFromMarker();
        });

        // Drag marker
        this.marker.addListener('dragend', () => {
            this.updateFromMarker();
        });
    }

    private updateFromMarker() {
        const pos = this.marker.getPosition();
        const lat = pos.lat();
        const lng = pos.lng();
        this.selectedLocation = { lat, lng, address: '' };
        this.reverseGeocode(lat, lng);
    }

    private reverseGeocode(lat: number, lng: number) {
        if (!this.geocoder) return;
        this.geocoder.geocode({ location: { lat, lng } }, (results: any[], status: string) => {
            if (status === 'OK' && results[0]) {
                const address = results[0].formatted_address;
                this.searchQuery = address;
                if (this.selectedLocation) {
                    this.selectedLocation = { ...this.selectedLocation, address };
                }
                this.cdr.detectChanges();
            }
        });
    }

    searchPlace() {
        const query = this.searchQuery.trim();
        if (!query || !this.mapsReady) return;

        const request = { query, fields: ['name', 'geometry', 'formatted_address'] };
        this.placesService.textSearch(request, (results: any[], status: string) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results?.length) {
                const place = results[0];
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                const address = place.formatted_address;

                this.selectedLocation = { lat, lng, address };
                this.searchQuery = address;
                this.marker.setPosition({ lat, lng });
                this.map.setCenter({ lat, lng });
                this.map.setZoom(15);
                this.cdr.detectChanges();
            } else {
                // Fallback to geocoder
                this.geocoder.geocode({ address: query }, (res: any[], st: string) => {
                    if (st === 'OK' && res?.length) {
                        const lat = res[0].geometry.location.lat();
                        const lng = res[0].geometry.location.lng();
                        const address = res[0].formatted_address;
                        this.selectedLocation = { lat, lng, address };
                        this.searchQuery = address;
                        this.marker.setPosition({ lat, lng });
                        this.map.setCenter({ lat, lng });
                        this.map.setZoom(15);
                        this.cdr.detectChanges();
                    }
                });
            }
        });
    }

    confirm() {
        if (this.selectedLocation) {
            this.locationSelected.emit(this.selectedLocation);
        }
    }

    close() {
        this.closed.emit();
    }

    ngOnDestroy() {
        this.map = null;
        this.marker = null;
    }
}
