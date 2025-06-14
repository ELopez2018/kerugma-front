import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { environment } from '../../../../environments/environment';
import { DataService } from '../../../core/services/data/data.service';

@Component({
  selector: 'app-poins-map',
  imports: [],
  templateUrl: './poins-map.component.html',
  styleUrl: './poins-map.component.css'
})
export class PoinsMapComponent implements OnInit {
  @Input() shops: any;
  public lat: number = 4.5354951;
  public lng: number = -75.6723427;
  public map: any;
  public icons: any;
  public streetMaps: any;
  public tilesMapbox: any;
  public marker: any;
  private readonly mapUrl: string = environment.URL_MAP;
  private readonly mapboxAccessToken: string = environment.MAPBOX_ACCESS_TOKEN;

  constructor(
    private dataService: DataService
  ) {

  }
  upStartPage() {
    window.scroll({
      top: -100,
      left: -100,
      behavior: 'smooth',
    });
  }
  ngOnInit(): void {
    this.initializeMapIcons()
    this.locateInitMap();
    this.upStartPage()
  }
  locateInitMap() {
    if (!navigator.geolocation) {
      console.warn('No soporta geolocalizacion');
      this.lat = 4.5354951;
      this.lng = -75.6723427;
      this.initMap();
    } else {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          this.lat = success.coords.latitude;
          this.lng = success.coords.longitude;
          this.initMap();
        },
        (failure) => {
          if (
            failure.message.startsWith(
              'Only secure origins are allowed'
            )
          ) {
            console.error('Error: ', failure.message);
            this.initMap();
          }
        }
      );
    }
  }

  private initializeMapIcons(): void {
    this.icons = {
      icon: L.icon({
        iconUrl: 'img/marker.png',
        iconSize: [20, 55], // Ajustado manteniendo proporción aproximada
        iconAnchor: [10, 55], // Centrado horizontalmente, base del icono en el punto del mapa
        popupAnchor: [0, -55], // Opcional: posición del popup con respecto al icono
        shadowUrl: '', // Si no tienes sombra, mejor omitir
      }),
    };
  }

  private initMap(): void {
    // Capa base personalizada
    this.streetMaps = L.tileLayer(this.mapUrl, {
      detectRetina: true, // Aprovecha pantallas Retina si es posible
      attribution: 'Map data &copy; <a href="#">JW</a>',
    });

    // Capa Mapbox como alternativa
    this.tilesMapbox = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        id: 'mapbox/streets-v11',// asegúrate de tener esta propiedad
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="#">JW</a>',
      }
    );

    // Inicializa el mapa
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 16, // Zoom más realista (22 es muy alto y puede no funcionar)
      layers: [this.streetMaps], // Puedes cambiar por this.tilesMapbox si lo prefieres
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Agrega un marcador con el ícono personalizado
    this.marker = L.marker([this.lat, this.lng], {
      icon: this.icons.icon,
      draggable: false,
    }).addTo(this.map);

    // Lógica adicional (ej. centrar o localizar)
    this.locateShop();
  }


  public locateMap(shop: any): void {
    if (!shop?.lat || !shop?.lng) {
      console.warn('Ubicación inválida para el comercio:', shop);
      return;
    }

    this.lat = shop.lat;
    this.lng = shop.lng;

    // Centrar el mapa suavemente en la nueva ubicación
    this.map.flyTo([this.lat, this.lng], 17);

    // Eliminar marcador anterior si existe
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    // Crear contenido HTML del popup
    const popupContent = `
    <p>
      <strong>By GiovanYe</strong><br>
      Dirección: ${shop.address || 'No disponible'}<br>
      Teléfono: ${shop.phone || 'No disponible'}
    </p>
  `;

    // Crear nuevo marcador con popup
    this.marker = L.marker([this.lat, this.lng], {
      icon: this.icons.icon,
    })
      .addTo(this.map)
      .bindPopup(popupContent)
      .openPopup();
  }

  public locateShop() {
    this.shops.forEach((shop: any) => {
      this.marker = L.marker([shop.lat, shop.lng], {
        icon: this.icons.icon,
      }).addTo(this.map);
    });
  }
}

