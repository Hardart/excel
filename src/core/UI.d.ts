namespace UiHdrt {
  type AlertStatus = 'danger' | 'success' | 'warning'
  interface AlertOptions {
    text: string
    duration?: number | undefined
    autoClose?: boolean
    status?: AlertStatus
    closable: boolean
  }

  interface AlertElement {
    console(): void
  }

  interface Alert {
    (options: AlertOptions): AlertElement
    (message: string, optionsOrStatus?: AlertOptions | AlertStatus): AlertElement
  }

  const alert: Alert
}

export default UiHdrt
