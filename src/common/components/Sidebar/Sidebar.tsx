import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <Box>
      <Button as={Link} href="toys">
        Toys
      </Button>
    </Box>
  );
};

export default Sidebar;
