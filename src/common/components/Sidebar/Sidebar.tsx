import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <Box padding="3">
      <Button as={Link} href="toys" width="100%">
        Toys
      </Button>
    </Box>
  );
};

export default Sidebar;
