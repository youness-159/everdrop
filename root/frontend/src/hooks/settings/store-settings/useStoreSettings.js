import { useQuery } from "@tanstack/react-query";
import { getStoreSettings } from "../../../services/settings/storeSettingAPI.js";

function useStoreSettings() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["store-settings"],
    queryFn: getStoreSettings,
  });

  return { data, isLoading, error };
}

export default useStoreSettings;
