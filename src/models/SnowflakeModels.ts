import { type Instance, types } from 'mobx-state-tree'

export const User = types
  .model({
    name: types.identifier,
    createdOn: types.string,
    loginName: types.string,
    displayName: types.string,
    firstName: types.string,
    lastName: types.string,
    email: types.string,
    minsToUnlock: types.maybeNull(types.number),
    daysToExpiry: types.maybeNull(types.number),
    comment: types.string,
    disabled: types.boolean,
    mustChangePassword: types.boolean,
    snowflakeLock: types.boolean,
    defaultWarehouse: types.string,
    defaultRole: types.string,
    defaultSecondaryRoles: types.string,
    extAuthnDuo: types.boolean,
    extAuthnUid: types.string,
    minsToBypassMfa: types.string,
    owner: types.string,
    lastSuccessLogin: types.maybeNull(types.string),
    expiresAtTime: types.null,
    lockedUntilTime: types.maybeNull(types.string),
    hasPassword: types.boolean,
    hasRsaPublicKey: types.boolean,
    bdsUserInfo: types.model({
      mobileNo: types.maybeNull(types.string),
      empId: types.maybeNull(types.string),
      cmpName: types.maybeNull(types.string),
      deptCode: types.maybeNull(types.string),
      deptName: types.maybeNull(types.string),
      dutyCode: types.maybeNull(types.string),
      empEmail: types.maybeNull(types.string),
      empNo: types.maybeNull(types.string),
      empName: types.maybeNull(types.string),
      cmpCode: types.maybeNull(types.string),
      empStatusCode: types.maybeNull(types.string),
    }),
  })
  .views((self) => ({
    get isEmailId() {
      const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      return expression.test(self.name)
    },
    get teamName() {
      return this.isUser ? `${self.bdsUserInfo.deptName} ${self.bdsUserInfo.cmpName}` : '확인되지 않은 사용자'
    },
    get isUser() {
      return !this.isAdminUser && self.bdsUserInfo.empNo != null
    },
    get isUnknownUser() {
      return !this.isAdminUser && self.bdsUserInfo.empNo === null
    },
    get isAdminUser() {
      const admins = process.env.REACT_APP_ADMINS ? process.env.REACT_APP_ADMINS.split(',') : []
      return admins.filter((s) => s.toUpperCase() === self.loginName.toUpperCase()).length > 0
    },
    get empName(): string {
      if (this.isUser) {
        return self.bdsUserInfo.empName!
      } else if (this.isUnknownUser) {
        return self.name
      } else {
        return self.name
      }
    },
    get profileUrl() {
      return `${process.env.REACT_APP_WEBO_PROFILE_URL}/${self.bdsUserInfo.cmpCode}/${self.bdsUserInfo.empNo}.jpg`
    },
  }))

export const TempWarehouse = types.model({
  name: types.string,
  type: types.string,
  size: types.string,
  autoSuspend: types.number,
  autoResume: types.string,
  comment: types.string,
})

export const Warehouse = types.model({
  warehouseId: types.identifier,
  name: types.string,
  state: types.string,
  type: types.string,
  size: types.string,
  running: types.number,
  queued: types.number,
  isDefault: types.string,
  isCurrent: types.string,
  autoSuspend: types.number,
  autoResume: types.string,
  available: types.maybeNull(types.number),
  provisioning: types.string,
  quiescing: types.string,
  other: types.string,
  createdOn: types.string,
  resumedOn: types.string,
  updatedOn: types.string,
  owner: types.string,
  comment: types.string,
  actives: types.string,
  resourceMonitor: types.string,
  pendings: types.number,
  failed: types.number,
  suspended: types.number,
  uuid: types.string,
})

export const Database = types.model({
  databaseId: types.identifier,
  name: types.string,
  createdOn: types.string,
  isDefault: types.string,
  isCurrent: types.string,
  origin: types.string,
  owner: types.string,
  comment: types.string,
  options: types.string,
  retentionTime: types.number,
  kind: types.string,
})

export const BdsUser = types.model({
  employeeStatusCode: types.string,
  employeeGMT: types.string,
  employeeKorName: types.string,
  mobileNo: types.string,
  dutyCode: types.string,
  employeeEmail: types.string,
  employeeNo: types.string,
  companyCode: types.string,
  employeeName: types.string,
  departmentCode: types.string,
  departmentName: types.string,
  employeeEngName: types.string,
})

export const Role = types
  .model({
    name: types.string,
    isDefault: types.string,
    isCurrent: types.string,
    isInherited: types.string,
    assignedToUsers: types.number,
    grantedToRoles: types.number,
    grantedRoles: types.number,
    owner: types.string,
    comment: types.string,
    createdOn: types.string,
  })
  .views((self) => ({
    get isSystemDefinedRole() {
      return self.owner === ''
    },
  }))

export const Share = types.model({
  createdOn: types.number,
  kind: types.string,
  shareType: types.string,
  ownerAccount: types.string,
  name: types.string,
  databaseName: types.string,
  to: types.string,
  owner: types.string,
  comment: types.string,
  listingGlobalName: types.string,
  jobs: types.optional(types.number, 1),
})

export const ShareUsage = types.model({
  shareName: types.string,
  listingGlobalName: types.string,
  listingDisplayName: types.string,
  listingName: types.string,
  providerAccountLocator: types.string,
  providerAccountName: types.string,
  consumerAccountLocator: types.string,
  consumerAccountName: types.string,
  jobs: types.number,
})

export const Table = types.model({})

export const AdminInfo = types.model({
  name: types.string,
  email: types.string,
})

export const Dummies = types.model('Dummy', {
  users: types.array(User),
  roles: types.array(Role),
  databases: types.array(Database),
  warehouses: types.array(Warehouse),
  shares: types.array(Share),
})

export const AccountTag = types.model({
  id: types.identifierNumber,
  name: types.string,
  createdDt: types.number,
  updatedDt: types.number,
  state: types.string,
})

export const Account = types
  .model('Account', {
    accountId: types.identifier,
    organizationName: types.maybeNull(types.string),
    accountName: types.maybeNull(types.string),
    region: types.maybeNull(types.string),
    edition: types.maybeNull(types.string),
    isDelete: types.maybeNull(types.string),
    accountMail: types.maybeNull(types.string),
    accountUrl: types.maybeNull(types.string),
    accountLocator: types.maybeNull(types.string),
    company: types.maybeNull(types.string),
    admin: types.maybeNull(types.string),
    adminMail: types.maybeNull(types.string),
    projectCode: types.maybeNull(types.string),
    projectName: types.maybeNull(types.string),
    projectInfo: types.maybeNull(types.string),
    comment: types.maybeNull(types.string),
    createdOn: types.number,
    users: types.array(User),
    roles: types.array(Role),
    databases: types.array(Database),
    warehouses: types.array(Warehouse),
    shares: types.array(Share),
    selected: types.optional(types.boolean, false),
    tags: types.maybeNull(types.array(AccountTag)),
  })
  .actions((self) => ({
    setUsers(users: Instance<typeof self.users>) {
      self.users = users
    },
    setRoles(roles: Instance<typeof self.roles>) {
      self.roles = roles
    },
    setDatabases(databases: Instance<typeof self.databases>) {
      self.databases = databases
    },
    setWarehouses(warehouses: Instance<typeof self.warehouses>) {
      self.warehouses = warehouses
    },
    setShares(shares: Instance<typeof self.shares>) {
      self.shares = shares
    },
    clearUsers() {
      self.users.clear()
    },
    clearRoles() {
      self.users.clear()
    },
    clearDatabases() {
      self.databases.clear()
    },
    clearWarehouses() {
      self.warehouses.clear()
    },
    clearShare() {
      self.shares.clear()
    },
    setSelected(isSelected: boolean) {
      self.selected = isSelected
    },
    clearAll() {
      this.clearUsers()
      this.clearRoles()
      this.clearDatabases()
      this.clearWarehouses()
      this.clearShare()
    },
  }))
  .views((self) => ({
    get admins() {
      let result: string[] = []
      if (self.admin) {
        result = self.admin.split(',')
      }
      return result
    },
  }))

function calculateTimeDifference(updatedDt: number) {
  const updatedDate = new Date(updatedDt)
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - updatedDate.getTime()

  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)

  if (months >= 1) {
    return months === 1 ? '1 month ago' : `${months} months ago`
  } else if (days >= 1) {
    return days === 1 ? '1 day ago' : `${days} days ago`
  } else if (hours >= 1) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  } else if (minutes >= 1) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
  } else {
    return 'just now'
  }
}

export const CutieQueryParameter = types.model({
  id: types.identifierNumber,
  queryId: types.number,
  parameterName: types.string,
  parameterType: types.string,
  createdDt: types.number,
  updatedDt: types.number,
  state: types.string,
})

export const CutieQuery = types
  .model({
    id: types.identifierNumber,
    subCategoryId: types.number,
    title: types.string,
    queryText: types.maybeNull(types.string),
    creator: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    createdDt: types.number,
    updatedDt: types.number,
    state: types.string,
    queryParameters: types.maybeNull(types.array(CutieQueryParameter)),
  })
  .views((self) => ({
    get updatedTimeDifference() {
      return calculateTimeDifference(self.updatedDt)
    },
  }))

export const CutieSubcategory = types
  .model({
    id: types.identifierNumber,
    categoryId: types.number,
    name: types.string,
    createdDt: types.number,
    updatedDt: types.number,
    state: types.string,
    queries: types.maybeNull(types.array(CutieQuery)),
  })
  .views((self) => ({
    get updatedTimeDifference() {
      return calculateTimeDifference(self.updatedDt)
    },
    get sortedQueries() {
      if (self.queries) {
        return self.queries.slice().sort((a, b) => a.id - b.id)
      } else return null
    },
  }))

export const CutieCategory = types
  .model({
    id: types.identifierNumber,
    createdDt: types.number,
    name: types.string,
    updatedDt: types.number,
    state: types.string,
    subcategories: types.maybeNull(types.array(CutieSubcategory)),
  })
  .views((self) => ({
    get updatedTimeDifference() {
      return calculateTimeDifference(self.updatedDt)
    },
    get sortedSubcategories() {
      if (self.subcategories) {
        return self.subcategories.slice().sort((a, b) => a.id - b.id)
      } else return null
    },
  }))

export const CutieAccount = types.model({
  accountId: types.string,
  organizationName: types.optional(types.maybeNull(types.string), ''),
  accountName: types.optional(types.maybeNull(types.string), ''),
  region: types.optional(types.maybeNull(types.string), ''),
  edition: types.optional(types.maybeNull(types.string), ''),
  isDelete: types.optional(types.maybeNull(types.string), ''),
  accountMail: types.optional(types.maybeNull(types.string), ''),
  accountUrl: types.optional(types.maybeNull(types.string), ''),
  accountLocator: types.optional(types.maybeNull(types.string), ''),
  company: types.optional(types.maybeNull(types.string), ''),
  admin: types.optional(types.maybeNull(types.string), ''),
  adminMail: types.optional(types.maybeNull(types.string), ''),
  projectCode: types.optional(types.maybeNull(types.string), ''),
  projectName: types.optional(types.maybeNull(types.string), ''),
  projectInfo: types.optional(types.maybeNull(types.string), ''),
  comment: types.optional(types.maybeNull(types.string), ''),
})

export const QueryMeta = types.model({
  columnDisplaySize: types.number,
  columnLabel: types.optional(types.maybeNull(types.string), ''),
  columnTypeName: types.optional(types.maybeNull(types.string), ''),
  catalogName: types.optional(types.maybeNull(types.string), ''),
  columnClassName: types.optional(types.maybeNull(types.string), ''),
  columnName: types.optional(types.maybeNull(types.string), ''),
  precision: types.number,
  scale: types.number,
  tableName: types.optional(types.maybeNull(types.string), ''),
  schemaName: types.optional(types.maybeNull(types.string), ''),
})
export type QueryMetaType = Instance<typeof QueryMeta>

export const QueryResponse = types.model({
  Input: types.string,
  Output: types.array(types.array(types.maybeNull(types.union(types.string, types.number)))),
  OutputMetaData: types.optional(types.array(QueryMeta), []),
})

export const Task = types.model({
  accountId: types.identifier,
  response: types.optional(types.array(QueryResponse), []),
  status: types.string,
  errorMessage: types.optional(types.string, ''),
})

export const QueryResultTab = types.model({
  id: types.identifierNumber,
  name: types.string,
  tasks: types.optional(types.array(Task), []),
  status: types.boolean,
})

export const UIData = types
  .model({
    accountViewType: types.optional(types.union(types.literal('CARD'), types.literal('LIST')), 'CARD'),
    userViewType: types.optional(types.union(types.literal('CARD'), types.literal('LIST')), 'CARD'),
    databaseViewType: types.optional(types.union(types.literal('CARD'), types.literal('LIST')), 'CARD'),
    warehouseViewType: types.optional(types.union(types.literal('CARD'), types.literal('LIST')), 'CARD'),
    roleViewType: types.optional(types.union(types.literal('CARD'), types.literal('LIST')), 'CARD'),
    shareViewType: types.optional(types.union(types.literal('GRAPH'), types.literal('LIST')), 'GRAPH'),
  })
  .views(() => ({
    get ViewTypeCard(): 'CARD' {
      return 'CARD'
    },
    get ViewTypeList(): 'LIST' {
      return 'LIST'
    },
    get ViewTypeGraph(): 'GRAPH' {
      return 'GRAPH'
    },
  }))

export const TestConnectionResult = types
  .model('TestConnectionResult', {
    accountName: types.optional(types.string, ''),
    userName: types.optional(types.string, ''),
    errorText: types.optional(types.maybeNull(types.string), ''),
    connected: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get isValid() {
      return self.accountName != '' && self.userName != ''
    },
  }))

export const KeycloakClient = types.model({
  clientId: types.optional(types.string, ''),
})

export const KeycloakOwner = types.model({
  companyCode: types.optional(types.string, ''),
  empNo: types.optional(types.string, ''),
  empId: types.optional(types.string, ''),
  empName: types.optional(types.string, ''),
  deptCode: types.optional(types.string, ''),
  deptName: types.optional(types.string, ''),
})

export const KeycloakClientRoles = types.model({
  name: types.optional(types.string, ''),
  owner: types.optional(types.maybeNull(KeycloakOwner), null),
})

export const KeycloakRole = types.model({
  id: types.identifier,
  name: types.optional(types.string, ''),
  description: types.optional(types.maybeNull(types.string), ''),
  containerId: types.optional(types.maybeNull(types.string), ''),
  composites: types.optional(types.maybeNull(types.string), null),
  composite: types.optional(types.maybeNull(types.boolean), false),
  clientRole: types.optional(types.maybeNull(types.boolean), true),
  scopeParamRequired: types.optional(types.maybeNull(types.string), null),
  attributes: types.optional(types.frozen(), {}),
  clientId: types.optional(types.string, ''),
})

// export const KeycloakRole = types.model({
//   id: types.identifierNumber,
//   name: types.optional(types.string, ''),
//   system: types.optional(types.string, ''),
//   isApproved: types.optional(types.string, 'Approved'),
//   createdDt: types.optional(types.string, '2024-01-01'),
//   updatedDt: types.optional(types.string, '2024-01-01'),
// })
