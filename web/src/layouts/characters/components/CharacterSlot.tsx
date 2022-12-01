import { IconPlayerPlay, IconTrash } from '@tabler/icons';
import { CharacterProps } from '../../../types';
import { Transition } from '@headlessui/react';
import { useCharacterIndexState } from '../../../state/characters';
import { fetchNui } from '../../../utils/fetchNui';
import React from 'react';
import { useSetDeleteModal } from '../../../state/modals';
import { useSetCharacterVisibility } from '../../../state/visibility';


const Character: React.FC<{ character: CharacterProps, index: number }> = (props) => {
  const [characterIndex, setCharacterIndex] = useCharacterIndexState();
  const setVisible = useSetCharacterVisibility();
  const setDeleteModal = useSetDeleteModal();

  const playCharacter = () => {
    fetchNui('ox:selectCharacter', props.character.slot);
    setVisible(false);
  };

  const selectCharacter = () => {
    setCharacterIndex(props.index);
    fetchNui('ox:setCharacter', props.index);
  };

  return (
    <>
      <div className='flex'>
        <div
          className={`hover-transition flex h-24 w-[85%] flex-col justify-evenly p-1.5 text-white hover:bg-black/40 ${characterIndex === props.index && 'bg-black/40'}`}
          onClick={selectCharacter}>
          <p className='truncate text-2xl'>{`${props.character.firstname} ${props.character.lastname}`}</p>
          <div>
            <p className='truncate text-sm'>Location: {props.character.location}</p>
            <p className='truncate text-sm'>Last played: {props.character.last_played}</p>
          </div>
        </div>
        <Transition
          show={characterIndex === props.index}
          as={React.Fragment}
          enter='scale opacity duration-300'
          enterFrom='scale-[0.9] opacity-0'
          enterTo='scale-1 opacity-100'
          leave='scale duration-300'
          leaveFrom='scale-1 opacity-100'
          leaveTo='scale-[0.9] opacity-0'
        >
          <div className='w-[15%]'>
            <div
              onClick={playCharacter}
              className='relative flex w-full h-1/2 justify-center items-center hover-transition bg-black/50 hover:bg-green-500'>
              <IconPlayerPlay className='text-white' />
            </div>
            <div
              onClick={() => setDeleteModal({ character: props.character, visible: true })}
              className='relative flex w-full h-1/2 justify-center items-center hover-transition bg-black/50 hover:bg-red-500'>
              <IconTrash className='text-white' />
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default Character;
