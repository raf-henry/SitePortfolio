import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  financeSysIndex = signal(0);
  financeSysImages = [
    '/images/TelaInicial-FinanceSys.png',
    '/images/TelaLogin-FinanceSys.png',
    '/images/TelaTransacoes-FinanceSys.png',
    '/images/TelaContas-FinanSys.png'
  ];

  bibliotecaSystemIndex = signal(0);
  bibliotecaSystemImages = [
    '/images/TelaInicial-BibliotecaSystem.png',
    '/images/TelaEmprestimos-BibliotecaSystem.png',
    '/images/TelaLivros-BibliotecaSystem.png',
    '/images/TelaAutores-BibliotecaSystem.png'
  ];

  isLightMode = signal(false);

  constructor() {
    // Sincronizar o estado do sinal com a classe aplicada pelo script no index.html
    this.isLightMode.set(document.documentElement.classList.contains('light'));
  }

  toggleTheme() {
    this.isLightMode.update(val => !val);
    if (this.isLightMode()) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }

  nextImage(project: 'finance' | 'biblioteca') {
    if (project === 'finance') {
      this.financeSysIndex.update(i => (i + 1) % this.financeSysImages.length);
    } else {
      this.bibliotecaSystemIndex.update(i => (i + 1) % this.bibliotecaSystemImages.length);
    }
  }

  prevImage(project: 'finance' | 'biblioteca') {
    if (project === 'finance') {
      this.financeSysIndex.update(i => (i - 1 + this.financeSysImages.length) % this.financeSysImages.length);
    } else {
      this.bibliotecaSystemIndex.update(i => (i - 1 + this.bibliotecaSystemImages.length) % this.bibliotecaSystemImages.length);
    }
  }
}
