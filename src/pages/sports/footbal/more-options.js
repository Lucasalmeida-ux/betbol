import Layout from '../../../components/layouts/home/layout'
import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR from 'swr'
import { useState } from 'react'
import ListMenu from '../../../components/layouts/home/listMenu'

export default function MoreOptions(props) {
  const [getOdds, setOdds] = useState([])
  const router = useRouter()
  const id = router.query.fixture
  const bookmaker = router.query.bookmarker
  const urlFix = `/api/betApi/fixture/${id}/`
  const urlOdds = `/api/betApi/odds/${id}/${bookmaker}`
  const fetcherFix = axios.get(urlFix)
  const { data, error } = useSWR(urlFix, fetcherFix)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const fetcherOdds = axios.get(urlOdds).then((res) => {
    setOdds(res.data.odds.response[0].bookmakers[0].bets)
  })
  const Odds = getOdds.map((odd, index) => {
    <div>oi</div>
  })

  const fixture = data.res_fixture.response[0]
  return <>
    <Layout>
      <div className="page grid grid-cols-7">
        <div className="col-span-1 mt-3 ml-3 border border-gray-200 rounded-md">
          <ListMenu />
        </div>
        <div className="col-span-6">
          <div className="flex flex-col md:flex-row px-4 select-none">

            <div id="infoLiga">
              <div id="liga">
                <span>Liga: {fixture.league.name}</span>
                <span>País: {fixture.league.country}</span>
              </div>
              <div id="times">
                <span>{fixture.score.halftime.home} - {fixture.teams.home.name}</span>
                <span>{fixture.score.halftime.away} - {fixture.teams.away.name}</span>
              </div>
              <div id="odds">
                {Odds}
              </div>
            </div>

            {/* <SoccerLive getTimeBet={getTimeBet} setTimeBet={setTimeBet} setListBetState={setListBetState} listBetState={listBetState} getValorFinal={getValorFinal} setValorFinal={setValorFinal} />
            <NoteBets setListBetState={setListBetState} listBetState={listBetState} getValorFinal={getValorFinal} setValorFinal={setValorFinal} /> */}
          </div>
        </div>
      </div>
    </Layout>
  </>
}