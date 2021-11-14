import { CloseIcon } from '@chakra-ui/icons';
import { Box, Link, MenuIcon, Text } from '@chakra-ui/react';
import { MouseEventHandler, ReactNode } from 'react';

// export const Dropdown = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   return (
//     <Menu isOpen={isOpen}>
//       <MenuButton
//         variant="ghost"
//         mx={1}
//         py={[1, 2, 2]}
//         px={4}
//         borderRadius={5}
//         // _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
//         aria-label="Courses"
//         fontWeight="normal"
//         onMouseEnter={onOpen}
//         onMouseLeave={onClose}
//       >
//         More {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
//       </MenuButton>
//       <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
//         <MenuItem>Menu Item 1</MenuItem>
//         <MenuItem>Menu Item 2</MenuItem>
//         <MenuItem>Menu Item 3</MenuItem>
//       </MenuList>
//     </Menu>
//   );
// };

const Logo = () => {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold">
        Logo
      </Text>
    </Box>
  );
};

const MenuToggle = ({ toggle, isOpen }: { toggle: MouseEventHandler<HTMLDivElement>; isOpen: boolean }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = '/', ...rest }: { children: ReactNode; isLast: boolean; to: string }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};
