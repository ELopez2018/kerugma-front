import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from "gsap";

@Component({
  selector: 'app-statistics',
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef;

  stats = [
    { title: 'Usuarios Activos', value: 1245 },
    { title: 'Proyectos Completados', value: 320 },
    { title: 'Crecimiento Mensual', value: '15%' },
    { title: 'Clientes Satisfechos', value: 98 },
  ];

  ngAfterViewInit(): void {

    gsap.from(this.container.nativeElement.children, {
      opacity: 0,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }
}
