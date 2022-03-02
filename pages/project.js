import React, { useState, createContext, useMemo } from 'react';
import { Box, Slide } from '@mui/material';
import { Layout } from '../layouts/layout';
import { Title } from '../components/title';
import { Workspace } from '../components/workspace';

export const ToggleContext = createContext({ togglePage: () => {} });

export default function Project() {
    const [checked, setChecked] = useState(true);
    const [titlePage, isTitlePage] = useState(true);
    const timeoutDuration = 500;
    const transitionDuration = 300;

    const page = useMemo(
        () => ({
            togglePage: () => {
                setChecked(false);
                setTimeout(() => {
                    setChecked(true);
                    isTitlePage((prev) => !prev);
                }, timeoutDuration)
            },
        }),
        []
    )

    return (
        <Layout>
            <Box sx={{ height: '100%' }}>
                <Box sx={{ width: '100%', height:'100%' }}>
                    <Slide 
                    direction="down"
                    in={checked}
                    timeout={transitionDuration}
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContents: 'center',
                            textAlign: 'center',
                            rowGap: 7,
                        }}>
                            {
                                titlePage ? 
                                <ToggleContext.Provider value={page}>
                                    <Title />
                                </ToggleContext.Provider> :
                                <Workspace />
                            }
                        </Box>
                    </Slide>
                </Box>
            </Box>
        </Layout>
    );
    // return (
    //     <Layout>
    //         <Title />

    //         {/* <Workspace /> */}
    //     </Layout>
    // );
}