import { types } from 'mobx-state-tree'

export const User = types.model({
  id: types.identifier,
  email: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
})

export const DefaultUser = () => {
  return {
    CMPCode: '',
    CMPName: '',
    EMPNO: '',
    EMPName: '',
    DEPTName: '',
    DEPTCode: '',
  }
}

export const DatahubUser = types
  .model({
    empID: types.optional(types.string, ''),
    no: types.optional(types.string, ''),
    name: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    teamCode: types.optional(types.string, ''),
    teamName: types.optional(types.string, ''),
    companyCode: types.optional(types.string, ''),
    companyName: types.optional(types.string, ''),
    datahubRoles: types.array(types.string),
    snowflakeAccountList: types.array(types.string),
  })
  .views((self) => ({
    get isAdmin() {
      return self.datahubRoles.length > 0 && self.datahubRoles.filter((u) => u === 'datahub$admin').length > 0
    },
  }))
