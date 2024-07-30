import { AppConfig } from '@configs/AppConfig'
import type { TestConnectionResult, User } from '@models/SnowflakeModels'
import { BaseRepository } from '@repositories/BaseRepository'
import { type SnowflakeRoleDto } from '@repositories/dto/SnowflakeRoleDto'
import { type CreateSnowflakeUserDto } from '@repositories/dto/SnowflakeUserDto'
import { type SnwoflakeWarehouseDTO } from '@repositories/dto/SnowflakeWarehouseDto'
import { type Instance } from 'mobx-state-tree'

class SnowflakeRepository extends BaseRepository {
  public async getAccounts() {
    return await this.requestWithAuth({
      url: '/api/snowflake/accounts?withTags=true',
      method: 'GET',
    })
  }

  public async runQuery(queryId: string, accounts: string[]) {
    return await this.requestWithAuth({
      url: `/api/snowflake/queries/run/${queryId}`,
      method: 'POST',
      data: {
        accounts: accounts,
      },
    })
  }
  public async runNewQuery(queryId: string, accounts: string[], params: object = {}) {
    return await this.requestWithAuth({
      url: `/api/snowflake/queries/run/${queryId}`,
      method: 'POST',
      data: {
        accounts: accounts,
        variables: params,
      },
    })
  }

  public async getUsers(orgAccountId: string): Promise<Instance<typeof User>[]> {
    return await this.requestWithAuth({
      url: `/api/snowflake/${orgAccountId}/users`,
      method: 'GET',
    })
  }

  public async getUser(orgAccountId: string, userId: string): Promise<Instance<typeof User>[]> {
    return await this.requestWithAuth({
      url: `/api/snowflake/${orgAccountId}/users/${userId}`,
      method: 'GET',
    })
  }

  public async testConnection(
    orgAccountId: string,
    userId: string,
    file: File,
    isEncrypted: boolean,
    passphrase: string | undefined,
  ): Promise<Instance<typeof TestConnectionResult>> {
    const formData = new FormData()
    formData.append('privateKey', file)
    if (isEncrypted && passphrase != undefined) formData.append('passphrase', passphrase as string)
    return await this.requestWithAuth({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: `/api/snowflake/${orgAccountId}/users/${userId}/connect`,
      method: 'POST',
      data: formData,
    })
  }

  public async getUserRoles(orgAccountId: string, email: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/${orgAccountId}/users/${email}`,
      method: 'GET',
      params: { role: true },
    })
  }

  public async adduser(
    orgAccountId: string,
    users: CreateSnowflakeUserDto[],
    successFunc: Function,
    failFunc: Function,
  ): Promise<PromiseSettledResult<number>[]> {
    return await Promise.allSettled(
      users.map(async (user) => {
        return await this.requestWithPopup(
          {
            url: `/api/snowflake/${orgAccountId}/users`,
            method: 'POST',
            data: {
              ...user,
            },
          },
          successFunc,
          failFunc,
        )
      }),
    )
  }

  public async deleteUser(orgAccountId: string, userId: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/${orgAccountId}/users/${userId}`,
      method: 'DELETE',
    })
  }

  public async getWarehouses(orgAccountId: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/${orgAccountId}/warehouses`,
      method: 'GET',
    })
  }

  public async postWarehouses(dto: SnwoflakeWarehouseDTO, successFunc: Function, failFunc: Function) {
    return await this.requestWithPopup(
      {
        url: `/api/snowflake/${dto.orgAccountId}/warehouses`,
        method: 'POST',
        data: dto,
      },
      successFunc,
      failFunc,
    )
  }

  public async putWarehouses(orgAccountId: string, name: string, successFunc: Function, failFunc: Function) {
    return await this.requestWithPopup(
      {
        url: `/api/snowflake/${orgAccountId}/warehouses/${name}`,
        method: 'PUT',
      },
      successFunc,
      failFunc,
    )
  }

  public async deleteWarehouses(orgAccountId: string, name: string, successFunc: Function, failFunc: Function) {
    return await this.requestWithPopup(
      {
        url: `/api/snowflake/${orgAccountId}/warehouses/${name}`,
        method: 'DELETE',
      },
      successFunc,
      failFunc,
    )
  }

  public async getDatabases(orgAccountId: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/${orgAccountId}/databases`,
      method: 'GET',
    })
  }

  public async postDatabases(orgAccountId: string, name: string, successFunc: Function, failFunc: Function) {
    return await this.requestWithPopup(
      {
        url: `/api/snowflake/${orgAccountId}/databases`,
        method: 'POST',
        data: { name },
      },
      successFunc,
      failFunc,
    )
  }

  public async putDatabases(orgAccountId: string, name: string, successFunc: Function, failFunc: Function) {
    return await this.requestWithPopup(
      {
        url: `/api/snowflake/${orgAccountId}/databases/${name}`,
        method: 'PUT',
        data: { name },
      },
      successFunc,
      failFunc,
    )
  }

  public async deleteDatabases(orgAccountId: string, name: string, successFunc: Function, failFunc: Function) {
    return await this.requestWithPopup(
      {
        url: `/api/snowflake/${orgAccountId}/databases/${name}`,
        method: 'DELETE',
      },
      successFunc,
      failFunc,
    )
  }

  public async getRoles(orgAccountId: string): Promise<SnowflakeRoleDto[]> {
    return await this.requestWithAuth({
      url: `/api/snowflake/${orgAccountId}/roles`,
      method: 'GET',
    })
  }

  public async grantRoleToUser(orgAccountId: string, roleName: string, userName: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/${orgAccountId}/roles/grant`,
      method: 'POST',
      data: { roleName: roleName, userName: userName },
    })
  }
  public async revokeRoleToUser(orgAccountId: string, roleName: string, userName: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/${orgAccountId}/roles/revoke`,
      method: 'POST',
      data: { roleName: roleName, userName: userName },
    })
  }

  public async getCategories(subcategories: boolean, queries: boolean) {
    return await this.requestWithAuth({
      url: `/api/snowflake/querycategories`,
      method: 'GET',
      params: { subcategories: subcategories, queries: queries },
    })
  }

  public async getCategoryById(categoryId: number, subcategories: boolean, queries: boolean) {
    return await this.requestWithAuth({
      url: `/api/snowflake/querycategories/${categoryId}`,
      method: 'GET',
      params: { subcategories: subcategories, queries: queries },
    })
  }

  public async createCategory(name: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/querycategories`,
      method: 'POST',
      data: { name: name },
    })
  }

  public async updateCategory(categoryId: number, name: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/querycategories/${categoryId}`,
      method: 'PUT',
      data: { name: name },
    })
  }

  public async deleteCategory(categoryId: number) {
    return await this.requestWithAuth({
      url: `/api/snowflake/querycategories/${categoryId}`,
      method: 'DELETE',
    })
  }

  public async getSubcategoryById(subcategoryId: number) {
    return await this.requestWithAuth({
      url: `/api/snowflake/subcategories/${subcategoryId}`,
      method: 'GET',
      params: { queries: true },
    })
  }

  public async createSubcategory(name: string, state: string, categoryId: number) {
    return await this.requestWithAuth({
      url: `/api/snowflake/subcategories`,
      method: 'POST',
      data: { name: name, state: state, categoryId: categoryId },
    })
  }

  public async updateSubcategory(subcategoryId: number, name: string, state: string, categoryId: number) {
    return await this.requestWithAuth({
      url: `/api/snowflake/subcategories/${subcategoryId}`,
      method: 'PUT',
      data: { name: name, state: state, categoryId: categoryId },
    })
  }

  public async deleteSubcategory(subcategoryId: number) {
    return await this.requestWithAuth({
      url: `/api/snowflake/subcategories/${subcategoryId}`,
      method: 'DELETE',
    })
  }

  public async createQuery(subcategoryId: number, title: string, queryText: string, creator: string, description: string, state: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/queries`,
      method: 'POST',
      data: {
        title: title,
        state: state,
        queryText: queryText,
        creator: creator,
        description: description,
        subcategoryId: subcategoryId,
      },
    })
  }

  public async getQueryById(queryId: number) {
    return await this.requestWithAuth({
      url: `/api/snowflake/queries/${queryId}?parameters=true`,
      method: 'GET',
    })
  }

  public async updateQuery(
    queryId: number,
    title: string,
    queryText: string,
    creator: string,
    description: string,
    state: string,
    subcategoryId: number,
  ) {
    return await this.requestWithAuth({
      url: `/api/snowflake/queries/${queryId}`,
      method: 'PUT',
      data: {
        title: title,
        queryText: queryText,
        creator: creator,
        description: description,
        state: state,
        subcategoryId: subcategoryId,
      },
    })
  }

  public async deleteQuery(queryId: number) {
    return await this.requestWithAuth({
      url: `/api/snowflake/queries/${queryId}`,
      method: 'DELETE',
    })
  }

  public async getQueryParameterById(parameterId: number) {
    return await this.requestWithAuth({
      url: `/api/snowflake/query-parameters/${parameterId}`,
      method: 'GET',
    })
  }

  public async createQueryParameter(queryId: number, parameterName: string, parameterType: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/query-parameters`,
      method: 'POST',
      data: {
        queryId: queryId,
        parameterName: parameterName,
        parameterType: parameterType,
      },
    })
  }
  public async deleteQueryParameter(parameterId: number) {
    return await this.requestWithAuth({
      url: `/api/snowflake/query-parameters/${parameterId}`,
      method: 'DELETE',
    })
  }

  public async getAccountTags() {
    return await this.requestWithAuth({
      url: `/api/snowflake/accounttags`,
      method: 'GET',
    })
  }

  public async postAccountTagMapping(tagName: string, accountLocator: string) {
    return await this.requestWithAuth({
      url: `/api/account-tag-mappings`,
      method: 'POST',
      data: {
        tagName: tagName,
        accountLocator: accountLocator,
      },
    })
  }

  public async deleteAccountTagMapping(tagName: string, accountLocator: string) {
    return await this.requestWithAuth({
      url: `/api/account-tag-mappings?tagName=${tagName}&accountLocator=${accountLocator}`,
      method: 'DELETE',
      data: {
        tagName: tagName,
        accountLocator: accountLocator,
      },
    })
  }

  public async getShares(accountId: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/${accountId}/shares`,
      method: 'GET',
    })
  }

  public async getExchanges(accountId: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/${accountId}/exchanges`,
      method: 'GET',
    })
  }

  public async getExchangesAvailableListings(accountId: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/${accountId}/exchanges/NEXON_MONOLAKE/listings`,
      method: 'GET',
    })
  }

  public async getExchangesMembers(accountId: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/${accountId}/exchanges/members`,
      method: 'GET',
    })
  }

  public async getConsumers(accountId: string, fromDate: string, toDate: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/${accountId}/consumers`,
      method: 'GET',
      params: { fromDate: fromDate, toDate: toDate },
    })
  }

  public async getClients() {
    return await this.requestWithAuth({
      url: `/authz/clients`,
      method: 'GET',
    })
  }

  public async getClientRoles(clientId: string) {
    return await this.requestWithAuth({
      url: `/authz/clients/${clientId}/roles`,
      method: 'GET',
    })
  }

  public async getClientRoleInfo(clientId: string, roleName: string) {
    return await this.requestWithAuth({
      url: `/authz/clients/${clientId}/roles/${roleName}`,
      method: 'GET',
    })
  }

  public async postClientRoleInfo(clientId: string, roleName: string, description: string) {
    return await this.requestWithAuth({
      url: `/authz/clients/${clientId}/roles`,
      method: 'POST',
      data: {
        name: roleName,
        description: description,
      },
    })
  }

  public async patchClientRoleInfo(clientId: string, roleName: string, newRoleName: string, newDescription: string) {
    return await this.requestWithAuth({
      url: `/authz/clients/${clientId}/roles/${roleName}`,
      method: 'PATCH',
      data: {
        name: newRoleName,
        description: newDescription,
        attributes: {},
      },
    })
  }

  public async syncAccount(accountId: string) {
    return await this.requestWithAuth({
      url: `/api/snowflake/${accountId}/roles/users`,
      method: 'DELETE',
    })
  }
}

const snowflakeRepository = new SnowflakeRepository(AppConfig.DATAHUB_API)
export default snowflakeRepository
