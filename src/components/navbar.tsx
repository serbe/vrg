import {
  Avatar,
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { ReactNode, ReactText } from 'react';
import { IconType } from 'react-icons';
import {
  HiAcademicCap,
  HiArrowCircleRight,
  HiBell,
  HiChevronDoubleDown,
  HiHome,
  HiMenu,
  HiOfficeBuilding,
  HiUserGroup,
  HiUsers,
} from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { useAuthState } from '../services/auth';

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

interface LinkItemProps {
  link: string;
  name: string;
  icon: IconType;
}

const navbarItems: LinkItemProps[] = [
  { link: '/contacts', name: 'Контакты', icon: HiUsers },
  { link: '/companies', name: 'Организации', icon: HiOfficeBuilding },
];

const sidebarItems: LinkItemProps[] = [
  { link: '/sirens', name: 'Сирены', icon: HiBell },
  { link: '/departments', name: 'Отделы', icon: HiUserGroup },
  { link: '/educations', name: 'Обучение', icon: HiAcademicCap },
  { link: '/kinds', name: 'Типы тренировок', icon: HiArrowCircleRight },
  { link: '/posts', name: 'Должности', icon: HiArrowCircleRight },
  { link: '/practices', name: 'Учения', icon: HiArrowCircleRight },
  { link: '/ranks', name: 'Чины', icon: HiArrowCircleRight },
  { link: '/scopes', name: 'Сферы', icon: HiArrowCircleRight },
  { link: '/certificates', name: 'Удостоверения', icon: HiArrowCircleRight },
  { link: '/sirentypes', name: 'Типы сирен', icon: HiArrowCircleRight },
];

export const Navbar = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useAuthState();

  return state.state === 'SIGNED_IN' ? (
    <Box minH="100vh" bg={useColorModeValue('white', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  ) : null;
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => (
  <Box
    transition="3s ease"
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: 60 }}
    pos="fixed"
    h="full"
    {...rest}
  >
    <Flex h="16" alignItems="center" mx="8" justifyContent="space-between">
      <Link
        as={NavLink}
        to="/"
        style={{ textDecoration: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        ЕДДС
      </Link>
      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
    </Flex>
    {sidebarItems.map((item) => (
      <SideItem key={item.name} link={item.link} icon={item.icon}>
        {item.name}
      </SideItem>
    ))}
  </Box>
);

interface ItemProps extends FlexProps {
  link: string;
  icon: IconType;
  step?: string;
  children: ReactText;
}

const Item = ({ link, icon, step, children, ...rest }: ItemProps) => (
  <Link as={NavLink} to={link} style={{ textDecoration: 'none' }}>
    <Flex
      align="center"
      p={step}
      mx={step}
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'cyan.400',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  </Link>
);

const NavItem = ({ link, icon, children, ...rest }: ItemProps) => (
  <Item link={link} icon={icon} step="2" {...rest}>
    {children}
  </Item>
);

const SideItem = ({ link, icon, children, ...rest }: ItemProps) => (
  <Item link={link} icon={icon} step="4" {...rest}>
    {children}
  </Item>
);

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => (
  <Flex
    ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 4 }}
    height="16"
    alignItems="center"
    bg={useColorModeValue('white', 'gray.900')}
    borderBottomWidth="1px"
    borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    justifyContent={{ base: 'space-between', md: 'flex-end' }}
    {...rest}
  >
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      onClick={onOpen}
      variant="outline"
      aria-label="open menu"
      icon={<HiMenu />}
    />

    <HStack spacing={{ base: '0', md: '0' }}>
      <NavItem link="/" icon={HiHome} display={{ base: 'flex', md: 'none' }}>
        ЕДДС
      </NavItem>
      {navbarItems.map((item) => (
        <NavItem key={item.name} link={item.link} icon={item.icon}>
          {item.name}
        </NavItem>
      ))}
    </HStack>

    <HStack spacing={{ base: '0', md: '6' }}>
      <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<HiBell />} />
      <Flex alignItems="center">
        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
            <HStack>
              <Avatar
                size="sm"
                src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              />
              <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                <Text fontSize="sm">Justina Clark</Text>
                <Text fontSize="xs" color="gray.600">
                  Admin
                </Text>
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <HiChevronDoubleDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Billing</MenuItem>
            <MenuDivider />
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  </Flex>
);
