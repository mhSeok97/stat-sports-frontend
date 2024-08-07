import { types } from 'mobx-state-tree'

export const League = types.model({
  id: types.identifierNumber,
  name: types.optional(types.string, ''),
  label_en: types.optional(types.string, ''),
  label_ko: types.optional(types.string, ''),
  path: types.optional(types.string, ''),
  margin_end: types.optional(types.string, ''),
  logo_url: types.optional(types.string, ''),
  country: types.optional(types.string, ''),
})
