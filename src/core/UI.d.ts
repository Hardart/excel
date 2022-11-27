namespace UI {
  type AlertStatus = 'danger' | 'success' | 'warinig'
  export interface AlertOptions {
    text: string
    duration?: number | undefined
    autoClose?: booleans
    status?: AlertStatus
  }
  interface UIkitAlertElement {
    console(): void
  }
  type Alert = (options?: AlertOptions | string[]) => UIkitAlertElement

  const alert: Alert
}

export default UI
