import { Grid, Box } from '@mui/material'
import { Layout } from '../layouts/layout'
import { Intro } from '../components/intro'
import { CreateButton } from '../components/buttons/createButton'
import { LoadButton } from '../components/buttons/loadButton'

export default function Home() {
  return (
      <Layout>
        <Box sx={{
          position: 'fixed',
          height: '100%',
        }}>
          <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="space-around"
          spacing={3}
          sx={{
            height: '100%',
          }}
          >
            <Grid item>
              <Intro />
            </Grid>
            <Grid 
            container 
            item
            direction="row"
            justifyContent="space-around"
            xs={4}
            >
              <Grid item>
                <CreateButton />
              </Grid>
              <Grid item>
                <LoadButton />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Layout>
  )
}
