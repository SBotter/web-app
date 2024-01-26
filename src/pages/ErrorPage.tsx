import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import {
  isRouteErrorResponse,
  useRouteError,
  useNavigate,
} from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <>
      <Box padding={5} bg="base.50" height={"100vh"}>
        <Heading marginTop={10} marginBottom={10} p={5}>
          <Text
            color="base.700"
            fontSize={{ base: "15px", md: "20px", lg: "30px" }}
            align="center"
          >
            Oops! Something Went Wrong.
          </Text>
        </Heading>
        <Text>
          {isRouteErrorResponse(error) ? (
            <>
              <Heading marginTop={10} marginBottom={10} p={5}>
                <Text
                  color="base.700"
                  fontSize={{ base: "15px", md: "20px", lg: "30px" }}
                  align="center"
                >
                  Page not exists!.
                </Text>
              </Heading>
            </>
          ) : (
            <>
              <VStack>
                <Text
                  color="base.700"
                  fontSize={{ base: "15px", md: "20px", lg: "30px" }}
                  align="center"
                  p={5}
                >
                  We apologize for the inconvenience, but it seems that there's
                  an issue with our app at the moment. <br />
                  Our team is actively working to resolve this issue and get
                  things back on track. In the meantime, here are a few things
                  you can try: <br />
                  <br />
                  <b>Refresh the Page:</b> Sometimes, a simple refresh can do
                  the trick. Click the refresh button on your browser or press
                  Ctrl + R (Windows) or Cmd + R (Mac). <br />
                  <br />
                  <b>Go Back to the Home Page:</b> If the issue persists, you
                  can{" "}
                  <button onClick={handleNavigateHome}>
                    <u>
                      <b>click here</b>
                    </u>
                  </button>{" "}
                  to return to the home page. <br />
                  We appreciate your patience as we work to fix this. If the
                  problem continues or if you have any additional information to
                  share, please contact our support team at
                  michelespasta@gmail.com - 778 838-2564. <br />
                  <br />
                  Thank you for your understanding.
                </Text>
              </VStack>
            </>
          )}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
