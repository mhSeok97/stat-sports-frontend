// import { Account, Dummies, TempWarehouse, Warehouse } from '@models/SnowflakeModels'
// import { type WarehouseDTO } from '@repositories/dto/WarehouseDto'
// import SnowflakeRepository from '@repositories/SnowflakeRepository'
// import { flow, type Instance, types } from 'mobx-state-tree'

// const emptyWarehouse = {
//   name: '',
//   state: '',
//   type: 'STANDARD',
//   size: 'XSMALL',
//   running: 0,
//   queued: 0,
//   isDefault: '',
//   isCurrent: '',
//   autoSuspend: 60,
//   autoResume: '',
//   available: null,
//   provisioning: '',
//   quiescing: '',
//   other: '',
//   createdOn: '',
//   resumedOn: '',
//   updatedOn: '',
//   owner: '',
//   comment: '',
//   actives: '',
//   resourceMonitor: '',
//   pendings: 0,
//   failed: 0,
//   suspended: 0,
//   uuid: '',
// }

// export const SnowflakeWarehouseStore = types
//   .model('SnowflakeWarehouseStore', {
//     isLoading: types.optional(types.boolean, true),
//     selectedAccount: types.maybeNull(types.reference(Account)),
//     newWarehouse: types.optional(TempWarehouse, emptyWarehouse),
//     selectedWarehouse: types.maybeNull(types.safeReference(Warehouse)),
//     isAddPopupOpen: types.optional(types.boolean, false),
//     isEditPopupOpen: types.optional(types.boolean, false),
//     nameValidationError: types.optional(types.maybeNull(types.string), null),
//     autoSuspendValidationError: types.optional(types.maybeNull(types.string), null),
//     sortType: types.optional(types.string, 'name'),
//     ascOrDesc: types.optional(types.string, 'asc'),
//   })
//   .actions((self) => ({
//     setAccount: (selected: Instance<typeof Account> | null) => {
//       self.selectedAccount = selected
//     },
//     toggleAddPopup: (state: boolean) => {
//       self.isAddPopupOpen = state
//     },
//     toggleEditPopup: (state: boolean) => {
//       self.isEditPopupOpen = state
//     },
//     setWarehouses: flow(function* () {
//       if (self.selectedAccount) {
//         self.selectedAccount.clearWarehouses()
//         self.isLoading = true

//         const result = yield SnowflakeRepository.getWarehouses(self.selectedAccount.accountId)
//         const updatedResult = result.map((warehouse: typeof Warehouse) => ({
//           ...warehouse,
//           warehouseId: warehouse.name,
//         }))
//         self.selectedAccount.setWarehouses(updatedResult)
//         self.isLoading = false
//         self.newWarehouse = emptyWarehouse
//       }
//     }),
//     initNewWarehouse: () => {
//       self.newWarehouse = emptyWarehouse
//     },
//     setNameValidationError: (error: string | null) => {
//       self.nameValidationError = error
//     },
//     setAutoSuspendValidationError: (error: string | null) => {
//       self.autoSuspendValidationError = error
//     },
//     setNewWarehouseName: (name: string) => {
//       self.newWarehouse.name = name
//     },
//     setNewWarehouseComment: (comment: string) => {
//       self.newWarehouse.comment = comment
//     },
//     setNewWarehouseType: (type: string) => {
//       self.newWarehouse.type = type
//     },
//     setNewWarehouseSize: (size: string) => {
//       self.newWarehouse.size = size
//     },
//     setNewWarehouseAutoSuspend: (autoSuspend: number) => {
//       self.newWarehouse.autoSuspend = autoSuspend
//     },
//     setNewWarehouseAutoResume: (autoResume: 'true' | 'false') => {
//       self.newWarehouse.autoResume = autoResume
//     },
//     setSelectedWarehouse: (warehouse: Instance<typeof Warehouse>) => {
//       self.selectedWarehouse = warehouse
//     },
//     clearSelectedWarehouse: () => {
//       self.selectedWarehouse = null
//     },
//     addWarehouse: flow(function* (successFunc: Function, failFunc: Function) {
//       if (self.selectedAccount) {
//         const warehouseDto: WarehouseDTO = {
//           orgAccountId: self.selectedAccount.accountId,
//           name: self.newWarehouse.name,
//           comment: self.newWarehouse.comment,
//           size: self.newWarehouse.size,
//           type: self.newWarehouse.type,
//           autoSuspend: self.newWarehouse.autoSuspend,
//           autoResume: self.newWarehouse.autoResume === 'true',
//         }

//         const result = yield SnowflakeRepository.postWarehouses(warehouseDto, successFunc, failFunc)
//         console.debug(result)
//         return true
//       }
//       return false
//     }),
//     deleteWarehouse: flow(function* (name: string, successFunc: Function, failFunc: Function) {
//       if (self.selectedAccount) {
//         const result = yield SnowflakeRepository.deleteWarehouses(self.selectedAccount.accountId, name, successFunc, failFunc)
//         console.debug(result)
//       }
//     }),
//     setSortType: (type: 'name' | 'type' | 'size' | 'autoSuspend') => {
//       self.sortType = type
//     },
//     setAscOrDesc: (ascOrDesc: 'asc' | 'desc') => {
//       self.ascOrDesc = ascOrDesc
//     },
//   }))
//   .views((self) => ({
//     get warehouses() {
//       if (self.selectedAccount) {
//         switch (self.sortType) {
//           case 'name':
//             return self.selectedAccount.warehouses.slice().sort((a, b) => {
//               return self.ascOrDesc === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
//             })
//           case 'type':
//             return self.selectedAccount.warehouses.slice().sort((a, b) => {
//               return self.ascOrDesc === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type)
//             })
//           case 'size':
//             const sizeOrder = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', '2X-Large', '3X-Large', '4X-Large', '5X-Large', '6X-Large']
//             return self.selectedAccount.warehouses.slice().sort((a, b) => {
//               const sizeAIndex = sizeOrder.indexOf(a.size)
//               const sizeBIndex = sizeOrder.indexOf(b.size)
//               return self.ascOrDesc === 'asc' ? sizeAIndex - sizeBIndex : sizeBIndex - sizeAIndex
//             })
//           case 'autoSuspend':
//             return self.selectedAccount.warehouses.slice().sort((a, b) => {
//               return self.ascOrDesc === 'asc' ? b.autoSuspend - a.autoSuspend : a.autoSuspend - b.autoSuspend
//             })
//         }

//         return self.selectedAccount.warehouses
//       } else {
//         return Dummies.create().warehouses
//       }
//     },
//   }))
