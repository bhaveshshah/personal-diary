import AddEntryButton from './AddEntryButton';

export default function Header() {
  return (
    <header className='navbar justify-between'>
      <div className='flex flex-col items-center'>
        <h1 className="text-3xl font-bold mb-2">📓Personal Diary</h1>
        <p className="text-md text-base-content/60">Write something small every day.</p>
      </div>
      <AddEntryButton />
    </header>
  );
}
