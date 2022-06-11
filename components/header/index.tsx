import styles from "../../styles/Home.module.css";
import logo from "../../public/logo.svg";
import logoText from "../../public/logoText.svg";
import avatar from "../../public/heli.svg";
import Image from "next/image";
import { Avatar, Badge, IconButton, Stack } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image src={logo} alt="logo" />
        <Image src={logoText} alt="logoText" />
      </div>
      <Stack spacing={4} direction="row" alignItems="center">
        <IconButton aria-label="cart">
          <Badge
            color="primary"
            badgeContent={5}
            className={styles.notification}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Avatar className={styles.avatar}>
          <Image src={avatar} alt="Remy Sharp" layout="fill" />
        </Avatar>
      </Stack>
    </div>
  );
};

export default Header;
