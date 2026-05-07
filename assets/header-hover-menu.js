class HoverHeaderMenu extends HTMLElement {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
    this.details = this.querySelector('details');
    this.summary = this.querySelector('summary');
    this.submenu = this.querySelector('.header__submenu');
    
    this.init();
  }

  init() {
    if (!this.details || !this.summary || !this.submenu) return;

    // 移除原来的点击事件处理
    this.summary.removeAttribute('aria-expanded');
    
    // 添加hover事件监听
    this.addEventListener('mouseenter', this.showSubmenu.bind(this));
    this.addEventListener('mouseleave', this.hideSubmenu.bind(this));
    
    // 确保子菜单在hover时保持显示
    this.submenu.addEventListener('mouseenter', this.showSubmenu.bind(this));
    this.submenu.addEventListener('mouseleave', this.hideSubmenu.bind(this));

    // 防止点击summary时的默认行为
    this.summary.addEventListener('click', this.preventClick.bind(this));
  }

  showSubmenu(event) {
    if (!this.header) return;
    
    // 设置header的preventHide属性，防止粘性header隐藏
    this.header.preventHide = true;
    
    // 显示下拉菜单
    this.details.setAttribute('open', '');
    this.summary.setAttribute('aria-expanded', 'true');
    
    // 设置header底部位置
    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') === '') {
      document.documentElement.style.setProperty(
        '--header-bottom-position-desktop',
        `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
      );
    }
  }

  hideSubmenu(event) {
    if (!this.header) return;
    
    // 添加延迟以防止菜单闪烁
    setTimeout(() => {
      // 检查鼠标是否仍在菜单区域内
      if (!this.matches(':hover') && !this.submenu.matches(':hover')) {
        this.header.preventHide = false;
        this.details.removeAttribute('open');
        this.summary.setAttribute('aria-expanded', 'false');
      }
    }, 100);
  }

  preventClick(event) {
    // 阻止点击summary时的默认切换行为
    event.preventDefault();
    
    // 如果有链接，仍然允许导航
    const link = this.summary.getAttribute('href');
    if (link && link !== '#') {
      window.location.href = link;
    }
  }
}

// 注册自定义元素
customElements.define('hover-header-menu', HoverHeaderMenu);

// 替换现有的header-menu元素
document.addEventListener('DOMContentLoaded', function() {
  const headerMenus = document.querySelectorAll('header-menu');
  headerMenus.forEach(menu => {
    const hoverMenu = document.createElement('hover-header-menu');
    hoverMenu.innerHTML = menu.innerHTML;
    hoverMenu.className = menu.className;
    menu.parentNode.replaceChild(hoverMenu, menu);
  });
});
