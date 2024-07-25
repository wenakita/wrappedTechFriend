import { Table } from "@radix-ui/themes";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatMappedTransaction } from "../../../../formatters/mapped-transaction-formatter";
function TransactionsTable({ data, type }: any) {
  return (
    <Table.Root
      variant="surface"
      className="bg-soft w-full overflow-hidden overflow-y-auto h-[400px] whitespace-nowrap"
    >
      <Table.Header>
        <Table.Row className="text-text text-[12px]">
          <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Value</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body className="text-text">
        {data && (
          <>
            {data?.map((item: any) => {
              const { time, ERC20IMG, TX_TYPE, amount, buyer, value, link } =
                formatMappedTransaction(item, type);

              return (
                <Table.Row className="text-text" key={item}>
                  <Table.RowHeaderCell>
                    <span className="flex gap-3">
                      <img
                        src={TX_TYPE ? ERC20IMG : item?.share_pfp}
                        alt=""
                        className="rounded-full size-6"
                      />
                      <FaLongArrowAltRight
                        className="mt-2 hidden md:block"
                        style={{ color: "gray" }}
                      />
                      <img
                        src={TX_TYPE ? item?.share_pfp : ERC20IMG}
                        alt=""
                        className="rounded-full size-6"
                      />
                    </span>
                  </Table.RowHeaderCell>
                  <Table.Cell className="text-center md:text-start">
                    {amount}
                  </Table.Cell>
                  <Table.Cell>{time}</Table.Cell>
                  <Table.Cell>{value}</Table.Cell>
                  <Table.Cell className="hover:underline">
                    <Link to={link} target="_blank">
                      {buyer}
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </>
        )}
      </Table.Body>
    </Table.Root>
  );
}

export default TransactionsTable;
//   <Table.Row className="text-text">
//           <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
//           <Table.Cell>danilo@example.com</Table.Cell>
//           <Table.Cell>Developer</Table.Cell>
//         </Table.Row>
