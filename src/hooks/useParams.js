import { useLocation } from 'react-router-dom';

export default function useParams() {
  return new URLSearchParams(useLocation().search);
}
