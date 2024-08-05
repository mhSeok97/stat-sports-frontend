export interface Menu {
  key: number
  name: string
  label_en: string
  label_ko: string
  path: string
  logo_url: string
  margin_end: string
}

export interface Menus {
  menus: Menu[]
}
