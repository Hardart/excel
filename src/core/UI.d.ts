namespace UI {
  type AlertStatus = 'danger' | 'success' | 'warning'
  export interface AlertOptions {
    text: string
    duration?: number | undefined
    autoClose?: boolean
    status?: AlertStatus
    closable: boolean
  }
  export interface PaginationOptions {
    currentPage: number
    totalPages: number
    arrows?: boolean
  }
  export interface BurgerOptions {
    animationDuration?: number
    selector?: string
  }

  interface AlertElement {
    console(): void
  }

  interface PaginationComponent {
    console(): void
  }

  interface BurgerNavComponent {
    console(): void
  }

  interface Alert {
    (options: AlertOptions): AlertElement
    (message: string, optionsOrStatus?: AlertOptions | AlertStatus): AlertElement
  }

  interface Pagination {
    (options: PaginationOptions): PaginationComponent
  }

  interface BurgerMenu {
    (parentElement: string, options?: BurgerOptions): BurgerNavComponent
  }

  const alert: Alert
  const pagination: Pagination
  const burgermenu: BurgerMenu
}

export default UI
