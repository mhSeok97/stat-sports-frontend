import { BaseRepository } from '@repositories/BaseRepository'
import { AppConfig } from '@configs/AppConfig'
class FootballRepository extends BaseRepository {
  public async getLeagues() {
    return await this.requestWithAuth({
      url: '/api/v1/football/leagues',
      method: 'GET',
    })
  }
}

const footballRepository = new FootballRepository(AppConfig.STAT_SPORTS_API)
export default footballRepository
