export {Start}

//not worrying about scalability for this protfolio project
//I would normally make the navbar listen for the even and determine which button was hovered

function Start(): void {
    const navbar: HTMLUListElement = document.getElementById('navbar-links-container') as HTMLUListElement;
    ControlNavItems(navbar);
}

function ControlNavItems(navbar: HTMLUListElement): void {
    const buttonControls: NavButtonControls = new NavButtonControls(navbar); 

    if(IsMobileScreen()) {
        const mobileMenuButtonController: MobileButtonControls = new MobileButtonControls(navbar);
        buttonControls.MobileClickControls();

    } else {
        buttonControls.TabControls();
    }
}

function IsMobileScreen(): boolean {
    return matchMedia('(pointer: coarse)').matches;
}

interface DropMenu {
    button: HTMLButtonElement;
    list: HTMLUListElement;
    icon: HTMLPictureElement;
}

function ExpandMenu(menu: DropMenu): void {
    menu.button.setAttribute('aria-expanded', 'true');
    menu.list.classList.add('list-expanded');
}

function CollapseMenu(menu: DropMenu): void {
    menu.button.setAttribute('aria-expanded', 'false');
    menu.list.classList.remove('list-expanded');
}

class NavButtonControls {
    hoveredButton: HTMLButtonElement;
    dropDownOpen: boolean = false;

    constructor(navbar: HTMLUListElement) {
        this.hoveredButton = navbar.getElementsByClassName('drop-button')[0] as HTMLButtonElement;

        this.hoveredButton.addEventListener('mousedown', (event) => {
          event.preventDefault();  
        })
    }

    MobileClickControls(): void {
        this.hoveredButton.addEventListener('click', () => {
            const fullMenu: DropMenu = this.CollectMenu();
            if(fullMenu.button == null)
                return;

            if(this.dropDownOpen) {
                CollapseMenu(fullMenu);
                this.hoveredButton.classList.remove("margin-adjustment");
                this.dropDownOpen = false;
                console.log("Drop Menu Closed!");
            } else {
                ExpandMenu(fullMenu);
                this.hoveredButton.classList.add("margin-adjustment");
                this.dropDownOpen = true;
                console.log("Drop Menu Opened!");
            }
            
        })
    }

    TabControls(): void {

        const focusOutEvent = (menu: HTMLLIElement) => {
            const handler = function(this: NavButtonControls) {
                const fullMenu: DropMenu = this.CollectMenu();
                if (fullMenu.button != null) {
                    CollapseMenu(fullMenu);
                }
                menu.removeEventListener('focusout', handler);
            }.bind(this);
            return handler;
        }

        this.hoveredButton.addEventListener('focus', () => {
            const fullMenu: DropMenu = this.CollectMenu();
            if(fullMenu.button != null){
                ExpandMenu(fullMenu);
                const lastListElement: HTMLLIElement = fullMenu.list.lastElementChild as HTMLLIElement;
                const handler = focusOutEvent(lastListElement);
                lastListElement?.addEventListener('focusout', handler);
            }
        })
    }

    private CollectMenu(): DropMenu {
        const menuList: HTMLUListElement = this.hoveredButton.parentElement?.parentElement?.getElementsByClassName('drop-menu')[0] as HTMLUListElement;
        const icon: HTMLImageElement = this.hoveredButton.querySelector('img') as HTMLImageElement;

        if(!menuList)
            return { button: null as unknown as HTMLButtonElement, list: null as unknown as HTMLUListElement, icon: null as unknown as HTMLImageElement };

        const fullMenu: DropMenu = {button: this.hoveredButton, list: menuList, icon: icon};
        return fullMenu;
    }
}

class MobileButtonControls {
    mobileNavButton: HTMLButtonElement = document.getElementById('mobile-nav-button') as HTMLButtonElement;
    menuOpened: boolean = false;


    constructor(menu: HTMLUListElement) {
        this.mobileNavButton.addEventListener('click', () => {
            console.log('button click');
            if(this.menuOpened){
                this.CloseNavMenu(menu);
            } else {
                this.OpenNavMenu(menu);
            }
        })
    }

    private OpenNavMenu(menu: HTMLUListElement) {
        this.menuOpened = true;
        this.mobileNavButton.setAttribute('aria-expanded', 'true');
        menu.classList.toggle('mobile-open');
        this.ToggleButtonBars();
    }

    private CloseNavMenu(menu: HTMLUListElement) {
        this.menuOpened = false;
        this.mobileNavButton.setAttribute('aria-expanded', 'false');
        menu.classList.toggle('mobile-open');
        this.ToggleButtonBars();
    }

    private ToggleButtonBars() {
        const bars: HTMLCollectionOf<HTMLSpanElement> = this.mobileNavButton.getElementsByClassName('bar') as HTMLCollectionOf<HTMLSpanElement>;
        for(let i: number = 0; i < bars.length; i++) {
            bars[i].classList.toggle('open');
        }
    }
}

Start();