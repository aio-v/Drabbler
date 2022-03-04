import React, { useState, createContext, useMemo } from 'react';
import { Box, Slide } from '@mui/material';
import { Layout } from '../layouts/layout';
import { Title } from '../components/title';
import { Workspace } from '../components/workspace';

export const ToggleContext = createContext({ togglePage: () => {} });

export default function Project() {
    const [scrollVisible, setScrollVisible] = useState(true);
    const [checked, setChecked] = useState(true);
    const [titlePage, isTitlePage] = useState(true);
    const timeoutDuration = 500;
    const transitionDuration = 300;

    const noscroll = <style global jsx>{`
    ::-webkit-scrollbar {
        width: 0px;
        background: transparent; 
    }
    `}</style>

    const scroll = <style global jsx>{`
    ::-webkit-scrollbar {
    }
    `}</style>

    const page = useMemo(
        () => ({
            togglePage: () => {
                setScrollVisible(false);
                setTimeout(() => {
                    setScrollVisible(true);
                }, timeoutDuration + transitionDuration);
                setChecked(false);
                setTimeout(() => {
                    isTitlePage((prev) => !prev);
                    setChecked(true);
                }, timeoutDuration);
            },
        }),
        []
    );

    return (
        <Layout>
            <Box sx={{ height: '100%', }}>
                <Box sx={{ width: '100%', height: "100%", }} >
                    {scrollVisible ? scroll : noscroll}
                    <Slide 
                    direction={titlePage == true ? "down" : "up"}
                    in={checked}
                    timeout={transitionDuration}
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContents: 'center',
                            textAlign: 'center',
                            rowGap: 7,
                        }}
                        mountOnEnter
                        unmountOnExit>
                            <ToggleContext.Provider value={{page, checked}}>
                                {titlePage ? <Title /> : <Workspace />}
                            </ToggleContext.Provider>
                        </Box>
                    </Slide>
                </Box>
            </Box>
        </Layout>
    );
}