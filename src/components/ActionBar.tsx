import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useRouter } from 'next/router';

const ActionBar = ({ title, buttons }) => {
  const router = useRouter();

  const clickHandler = (button) => {
    console.log('creating click handler for button', button);
    return () => {
      console.log('invoking click handler for button', button);
      let doPush = true;
      if (button.onClick) {
        doPush = button.onClick();
      }
      doPush && button.url && router.push(button.url);
    };
  };


  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {/* This empty box will push the Save button to the far right */}
          {/* 246px, 16px padding aligns with the left side of the form */}
          {title &&
            <Typography variant="h4" component="div" sx={{ marginLeft: "246px", paddingLeft: "16px" }}>
              {title}
            </Typography>
          }
        </Box>
        <Stack direction="row" spacing={2}>
          {buttons && buttons.map((button) => (
            <Button
              onClick={clickHandler(button)}
              variant={button.variant || "contained"}
              type={button.type || null}
              form={button.form || null}
              color={button.color || "inherit"}
              sx={button.sx || { width: "100%" }}
            >
              {button.label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default ActionBar;
