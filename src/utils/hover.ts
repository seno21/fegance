export function hoverBg(e: MouseEvent, color: string) {
  const el = e.currentTarget as HTMLElement
  if (el) el.style.backgroundColor = color
}

export function hoverColor(e: MouseEvent, color: string) {
  const el = e.currentTarget as HTMLElement
  if (el) el.style.color = color
}

export function hoverBorder(e: MouseEvent, color: string) {
  const el = e.currentTarget as HTMLElement
  if (el) el.style.borderColor = color
}

export function hoverResetBg(e: MouseEvent, color: string) {
  const el = e.currentTarget as HTMLElement
  if (el) el.style.backgroundColor = color
}

export function hoverResetColor(e: MouseEvent, color: string) {
  const el = e.currentTarget as HTMLElement
  if (el) el.style.color = color
}

export function hoverBgColor(e: MouseEvent, bg: string, color: string) {
  const el = e.currentTarget as HTMLElement
  if (el) {
    el.style.backgroundColor = bg
    el.style.color = color
  }
}

export function hoverResetBgColor(e: MouseEvent, bg: string, color: string) {
  const el = e.currentTarget as HTMLElement
  if (el) {
    el.style.backgroundColor = bg
    el.style.color = color
  }
}

export function hoverBorderBg(e: MouseEvent, border: string, bg: string) {
  const el = e.currentTarget as HTMLElement
  if (el) {
    el.style.borderColor = border
    el.style.backgroundColor = bg
  }
}
