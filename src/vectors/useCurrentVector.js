import { useContext } from 'react';
import PanelContextV2 from '@/context/PanelContextV2';
export function useCurrentVector() {
  return useContext(PanelContextV2);
}
