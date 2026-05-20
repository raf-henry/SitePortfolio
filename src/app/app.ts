import { Component, signal, AfterViewInit, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
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

  roleLength = signal(0);
  greetingLength = signal(0);
  nameLength = signal(0);
  descLength = signal(0);

  fullRole = 'Desenvolvedor Full-Stack';
  fullGreeting = 'Olá, sou ';
  fullName = 'Henry Rafael';
  fullDesc = 'Estudo a criação de aplicações web completas, o poder à segurança do backend e a interatividade e design do frontend.';

  currentTyping = signal('');
  showHeroButton = signal(false);

  constructor() {
    // Sincronizar o estado do sinal com a classe aplicada pelo script no index.html
    this.isLightMode.set(document.documentElement.classList.contains('light'));
  }

  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
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

  ngAfterViewInit() {
    this.startTypingAnimation();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));
  }

  async startTypingAnimation() {
    this.currentTyping.set('role');
    await this.typeLength(this.fullRole.length, this.roleLength, 45);
    this.currentTyping.set('heading');
    await this.typeLength(this.fullGreeting.length, this.greetingLength, 45);
    await this.typeLength(this.fullName.length, this.nameLength, 40);
    this.currentTyping.set('desc');
    await this.typeLength(this.fullDesc.length, this.descLength, 20);
    this.currentTyping.set('none');

    // Atraso antes de exibir o botão
    await new Promise(resolve => setTimeout(resolve, 200));
    this.showHeroButton.set(true);
  }

  typeLength(totalLength: number, signalVar: WritableSignal<number>, speed: number): Promise<void> {
    return new Promise(resolve => {
      let current = 0;
      const interval = setInterval(() => {
        current++;
        signalVar.set(current);
        if (current >= totalLength) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }
}
