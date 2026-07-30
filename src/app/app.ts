import { Component, signal, AfterViewInit, WritableSignal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

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

  languages: Language[] = [
    { code: 'PT', name: 'Português', flag: 'br' },
    { code: 'EN', name: 'English', flag: 'us' }
  ];

  selectedLanguage = signal<Language>(this.languages[0]);
  isLanguageMenuOpen = signal<boolean>(false);

  translations = {
    PT: {
      navHome: 'Início',
      navSkills: 'Habilidades',
      navEducation: 'Formação',
      navProjects: 'Projetos',

      role: 'Desenvolvedor Full-Stack',
      greeting: 'Olá, sou ',
      name: 'Henry Rafael',
      desc: 'Estudo a criação de aplicações web completas, o poder à segurança do backend e a interatividade e design do frontend.',
      viewProjectsBtn: 'Ver Projetos',

      skillsTitle: 'Habilidades & Tecnologias',

      educationTitle: 'Formação',
      educationPeriod: '4º período • Conclusão prevista para 12/2027',
      educationCourse: 'Análise e Desenvolvimento de Sistemas',
      educationInstitution: 'UNIGOIÁS – CENTRO UNIVERSITÁRIO DE GOIÁS',

      projectsTitle: 'Projetos em Andamento',
      financeSysDesc: 'Sistema inteligente de gestão financeira com integração à API Google Gemini para leitura autônoma de extratos bancários e dashboard reativo.',
      bibliotecaSysDesc: 'Solução moderna para gestão de bibliotecas com estética Glassmorphism, controle de inventário e cálculo automático de multas.',
      viewProject: 'Ver Projeto',

      contactTitle: 'Contato',
      contactEmailLabel: 'E-mail',
      contactGithubLabel: 'Veja meus Projetos',
      contactLinkedinLabel: 'Conecte-se comigo',
      contactWhatsappLabel: 'Contate-me'
    },
    EN: {
      navHome: 'Home',
      navSkills: 'Skills',
      navEducation: 'Education',
      navProjects: 'Projects',

      role: 'Full-Stack Developer',
      greeting: 'Hello, I am ',
      name: 'Henry Rafael',
      desc: 'I study full-stack web application development, combining backend security with frontend interactivity and design.',
      viewProjectsBtn: 'View Projects',

      skillsTitle: 'Skills & Technologies',

      educationTitle: 'Education',
      educationPeriod: '4th term • Expected graduation: 12/2027',
      educationCourse: 'Systems Analysis and Development',
      educationInstitution: 'UNIGOIÁS – UNIVERSITY CENTER OF GOIÁS',

      projectsTitle: 'Projects in Progress',
      financeSysDesc: 'Smart financial management system integrated with Google Gemini API for autonomous bank statement processing and a reactive dashboard.',
      bibliotecaSysDesc: 'Modern library management solution with Glassmorphism aesthetic, inventory control, and automated fine calculation.',
      viewProject: 'View Project',

      contactTitle: 'Contact',
      contactEmailLabel: 'Email',
      contactGithubLabel: 'View my Projects',
      contactLinkedinLabel: 'Connect with me',
      contactWhatsappLabel: 'Contact me'
    }
  };

  get t() {
    return this.translations[this.selectedLanguage().code as 'PT' | 'EN'];
  }

  roleLength = signal(0);
  greetingLength = signal(0);
  nameLength = signal(0);
  descLength = signal(0);

  fullRole = '';
  fullGreeting = '';
  fullName = '';
  fullDesc = '';

  currentTyping = signal('');
  showHeroButton = signal(false);

  private typingInterval: any = null;
  private currentAnimationId = 0;

  constructor(private location: Location) {
    // Sincronizar o estado do sinal com a classe aplicada pelo script no index.html
    this.isLightMode.set(document.documentElement.classList.contains('light'));

    // Detectar idioma de preferência, URL ou do sistema operacional
    const initialLang = this.detectSystemLanguage();
    this.selectedLanguage.set(initialLang);
    this.applyLanguageTexts(initialLang.code as 'PT' | 'EN', false);
    this.updateUrlPath(initialLang.code);
  }

  detectSystemLanguage(): Language {
    // 1. Verificar se a URL atual contém /en ou /pt
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('/en')) {
        const found = this.languages.find(l => l.code === 'EN');
        if (found) return found;
      }
      if (path.includes('/pt')) {
        const found = this.languages.find(l => l.code === 'PT');
        if (found) return found;
      }
    }

    // 2. Verificar preferência salva no localStorage
    const savedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('preferred_language') : null;
    if (savedLang) {
      const found = this.languages.find(l => l.code === savedLang);
      if (found) return found;
    }

    // 3. Verificar idioma do navegador
    const browserLang = (typeof navigator !== 'undefined' ? (navigator.language || (navigator as any).userLanguage || '') : '').toLowerCase();
    if (browserLang.startsWith('pt')) {
      return this.languages.find(l => l.code === 'PT') || this.languages[0];
    }
    return this.languages.find(l => l.code === 'EN') || this.languages[1];
  }

  toggleLanguageMenu(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isLanguageMenuOpen.update(val => !val);
  }

  selectLanguage(lang: Language) {
    this.selectedLanguage.set(lang);
    this.isLanguageMenuOpen.set(false);
    localStorage.setItem('preferred_language', lang.code);
    this.applyLanguageTexts(lang.code as 'PT' | 'EN', true);
    this.updateUrlPath(lang.code);
  }

  updateUrlPath(code: string) {
    if (typeof window !== 'undefined') {
      const targetPath = '/' + code.toLowerCase();
      if (window.location.pathname !== targetPath) {
        this.location.go(targetPath);
      }
    }
  }

  applyLanguageTexts(code: 'PT' | 'EN', isLanguageChange: boolean = false) {
    const t = this.translations[code];
    this.fullRole = t.role;
    this.fullGreeting = t.greeting;
    this.fullName = t.name;
    this.fullDesc = t.desc;

    if (isLanguageChange) {
      if (this.typingInterval) {
        clearInterval(this.typingInterval);
        this.typingInterval = null;
      }
      this.currentAnimationId++;
      this.roleLength.set(this.fullRole.length);
      this.greetingLength.set(this.fullGreeting.length);
      this.nameLength.set(this.fullName.length);
      this.descLength.set(this.fullDesc.length);
      this.currentTyping.set('none');
      this.showHeroButton.set(true);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      this.isLanguageMenuOpen.set(false);
    }
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
    const animId = ++this.currentAnimationId;

    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
    this.roleLength.set(0);
    this.greetingLength.set(0);
    this.nameLength.set(0);
    this.descLength.set(0);
    this.showHeroButton.set(false);

    this.currentTyping.set('role');
    if (!(await this.typeLength(this.fullRole.length, this.roleLength, 45, animId))) return;
    this.currentTyping.set('heading');
    if (!(await this.typeLength(this.fullGreeting.length, this.greetingLength, 45, animId))) return;
    if (!(await this.typeLength(this.fullName.length, this.nameLength, 40, animId))) return;
    this.currentTyping.set('desc');
    if (!(await this.typeLength(this.fullDesc.length, this.descLength, 20, animId))) return;

    if (this.currentAnimationId !== animId) return;
    this.currentTyping.set('none');

    await new Promise(resolve => setTimeout(resolve, 200));
    if (this.currentAnimationId === animId) {
      this.showHeroButton.set(true);
    }
  }

  typeLength(totalLength: number, signalVar: WritableSignal<number>, speed: number, animId: number): Promise<boolean> {
    return new Promise(resolve => {
      let current = 0;
      if (this.typingInterval) {
        clearInterval(this.typingInterval);
      }
      this.typingInterval = setInterval(() => {
        if (this.currentAnimationId !== animId) {
          clearInterval(this.typingInterval);
          this.typingInterval = null;
          resolve(false);
          return;
        }
        current++;
        signalVar.set(current);
        if (current >= totalLength) {
          clearInterval(this.typingInterval);
          this.typingInterval = null;
          resolve(true);
        }
      }, speed);
    });
  }
}
