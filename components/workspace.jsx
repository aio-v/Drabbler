import React from 'react';
import { Box, Grow } from '@mui/material';
import { DrabbleEditor } from './workspaceComponents/drabbleEditor';
import { LoadToTitleButton } from './buttons/toTitleButton';

export function Workspace() {
    return (
        <Box>
            <h2>Workspace</h2>
            <DrabbleEditor />
            <Box sx={{
                position: "fixed",
                bottom: "2.5%",
                right: "1.5%"
            }}>
                <LoadToTitleButton />
            </Box>

        </Box>
    )
}