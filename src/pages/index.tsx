import { trpc } from '../utils/trpc';

interface Item {
  id: number;
  listId: number;
  item: string;
  checked: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function IndexPage() {
  const listQuery = trpc.useQuery(['list.all']);
  console.log(listQuery.data);

  // Move to state
  const listArr: Item[] = listQuery.data || [];

  return (
    <div>
      <h2>
        List
        {listQuery.status === 'loading' && '(loading)'}
      </h2>
      {listArr.length
        ? listArr.map((item: Item) => <p key={item.id}>{item.item}</p>)
        : null}
    </div>
  );
}
