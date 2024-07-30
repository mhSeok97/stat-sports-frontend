// import { UIData } from '@models/SnowflakeModels'
// import { SnowflakeAccountStore } from '@stores/SnowflakeAccountStore'
// import { SnowflakeAuthStore } from '@stores/SnowflakeAuthStore'
// import { types } from 'mobx-state-tree'

// export const SnowflakeStore = types
//   .model({
//     accountStore: SnowflakeAccountStore,
//     authStore: SnowflakeAuthStore,
//     uiData: types.optional(UIData, {}),
//   })
//   .actions((self) => ({
//     toggleAccountViewType() {
//       if (self.uiData.accountViewType === self.uiData.ViewTypeCard) {
//         self.uiData.accountViewType = self.uiData.ViewTypeList
//       } else {
//         self.uiData.accountViewType = self.uiData.ViewTypeCard
//       }
//     },
//     toggleDatabaseViewType() {
//       if (self.uiData.databaseViewType === self.uiData.ViewTypeCard) {
//         self.uiData.databaseViewType = self.uiData.ViewTypeList
//       } else {
//         self.uiData.databaseViewType = self.uiData.ViewTypeCard
//       }
//     },
//     toggleWarehouseViewType() {
//       if (self.uiData.warehouseViewType === self.uiData.ViewTypeCard) {
//         self.uiData.warehouseViewType = self.uiData.ViewTypeList
//       } else {
//         self.uiData.warehouseViewType = self.uiData.ViewTypeCard
//       }
//     },
//     toggleUserViewType() {
//       if (self.uiData.userViewType === self.uiData.ViewTypeCard) {
//         self.uiData.userViewType = self.uiData.ViewTypeList
//       } else {
//         self.uiData.userViewType = self.uiData.ViewTypeCard
//       }
//     },
//     toggleRoleViewType() {
//       if (self.uiData.roleViewType === self.uiData.ViewTypeCard) {
//         self.uiData.roleViewType = self.uiData.ViewTypeList
//       } else {
//         self.uiData.roleViewType = self.uiData.ViewTypeCard
//       }
//     },
//     toggleShareViewType() {
//       if (self.uiData.shareViewType === self.uiData.ViewTypeGraph) {
//         self.uiData.shareViewType = self.uiData.ViewTypeList
//       } else {
//         self.uiData.shareViewType = self.uiData.ViewTypeGraph
//       }
//     },
//   }))
//   .views((self) => ({
//     get isReady() {
//       return self.accountStore.isReady
//     },
//   }))
