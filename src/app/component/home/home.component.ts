import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PoPageModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
