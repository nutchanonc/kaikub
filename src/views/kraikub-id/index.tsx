import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { Card } from "../../components/Card";
import { ClientRender } from "../../components/ClientRender";
import { LinkWrap } from "../../components/LinkWrap";
import { useUser } from "../../contexts/User";
import { useClientTranslation } from "../../hooks/client-translation";
import { useOnClient } from "../../hooks/on-client";
import { dictWhenNoActiveAccount } from "../../translate/kraikubid";
import { AccessesCard } from "./components/AccessesCard";
import { DevicesCard } from "./components/DevicesCard";
import { NotificationCard } from "./components/NotificationCard";
import { OrganizationCard } from "./components/OrganizationCard";
import { UserCard } from "./components/UserCard";

export const KraikubIdPageBody: FC<OAuthActivitiesProps> = (props) => {
  const { user } = useUser();
  const { t } = useClientTranslation(dictWhenNoActiveAccount);

  if (!user) {
    return null;
  }

  if (!user.personalEmail) {
    return (
      <Container
        maxW="container.md"
        h="50vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          props={{
            pt: "40px",
            rounded: 16,
          }}
        >
          <Container maxW="container.sm">
            <Box textAlign="center">
              <Heading size="lg">{t("header")}</Heading>
              <Text fontSize={16} opacity={0.8} mt={4}>
                {t("description")}
              </Text>
              <LinkWrap href="/id/activate">
                <Button
                  size="lg"
                  w="full"
                  fontWeight={600}
                  mt={16}
                  px={14}
                  colorScheme="kraikub.blue.always"
                  color="white"
                >
                  {t("btn-activate")}
                </Button>
              </LinkWrap>
            </Box>
          </Container>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py="20px">
      <Grid templateColumns="repeat(12, 1fr)" columnGap={4} rowGap={4} w="full">
        <GridItem colSpan={[12, 12, 8]}>
          <VStack spacing={4}>
            <UserCard user={user} />
            <DevicesCard logs={props.logs} />
            <AccessesCard accesses={props.accesses} />
          </VStack>
        </GridItem>
        <GridItem colSpan={[12, 12, 4]}>
          <VStack spacing={4}>
            <OrganizationCard user={user} />
            <NotificationCard user={user} />
          </VStack>
        </GridItem>
      </Grid>
      <VStack spacing={4}>
        {/* <UserCard user={user} />
        <Grid
          templateColumns="repeat(12, 1fr)"
          columnGap={6}
          rowGap={6}
          w="full"
        >
          <GridItem colSpan={[12, 12, 5]}>
            <NotificationCard user={user} />
          </GridItem>
          <GridItem colSpan={[12, 12, 7]}>
            <DevicesCard logs={props.logs} />
          </GridItem>
        </Grid>
        <AccessesCard accesses={props.accesses} /> */}
      </VStack>
    </Container>
  );
};
