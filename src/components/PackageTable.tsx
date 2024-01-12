import { Package } from "../hooks/useProducts";
import { Table, Th, Thead, Tr, Text, Tbody, Td } from "@chakra-ui/react";

interface Props {
  productPackage: Package[];
}

const PackageTable = ({ productPackage }: Props) => {
  return (
    <Table size="sm" colorScheme="base">
      <Thead bg="base.200">
        <Tr>
          <Th>
            <i className="fa-solid fa-scale-balanced product-detail-icon-link" />
            <Text color="base.700" fontSize="20px">
              Size
            </Text>
          </Th>
          <Th>
            <i className="fa-solid fa-dollar-sign product-detail-icon-link" />
            <Text color="base.700" fontSize="20px">
              Price
            </Text>
          </Th>
          <Th>
            <i className="fa-solid fa-people-roof product-detail-icon-link" />
            <Text color="base.700" fontSize="20px">
              Details
            </Text>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {productPackage.map((item) => (
          <Tr key={item.packageId}>
            <Td>
              <Text color="base.700" fontSize="18px">
                {item.packageSize} {item.packageUnit}
              </Text>
            </Td>
            <Td>
              <Text color="base.700" fontSize="18px">
                {item.packagePrice}
              </Text>
            </Td>
            <Td>
              <Text color="base.700" fontSize="18px">
                {item.packageDescription}
              </Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default PackageTable;
