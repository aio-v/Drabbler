import { Grid } from '@mui/material'
import { Layout } from '../layouts/layout'
import { Intro } from '../components/intro'
import { CreateButton } from '../components/buttons/createButton'
import { LoadButton } from '../components/buttons/loadButton'

export default function Home() {
  return (
      <Layout>
        <Intro />
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xl={4} align="center">
            <CreateButton />
          </Grid>
          <Grid item xl={4} align="center">
            <LoadButton />
          </Grid>
        </Grid>
      </Layout>
  )
}
