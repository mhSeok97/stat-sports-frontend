import { AppConfig } from '@configs/AppConfig'
import { BaseRepository } from '@repositories/BaseRepository'
class FootballRepository extends BaseRepository {
  public async getLeagues() {
    return await this.requestWithAuth({
      url: '/api/v1/football/leagues',
      method: 'GET',
    })
  }

  public async getTeams(leagueId?: number, seasonId?: number) {
    return await this.requestWithAuth({
      url: '/api/v1/football/teams',
      method: 'GET',
      params: { leagueId: leagueId, seasonId: seasonId },
    })
  }
}

const footballRepository = new FootballRepository(AppConfig.STAT_SPORTS_API)
export default footballRepository
