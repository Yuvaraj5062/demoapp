import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { QuickUserToggler } from "../extras/QuiclUserToggler";

export function Topbar({mob}) {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      viewUserDisplay: objectPath.get(uiService.config, "extras.user.display"),
    };
  }, [uiService]);

  return (
    <div className={`topbar float-left ${mob ? "showuser" : ""}`}>
      {layoutProps.viewUserDisplay && <QuickUserToggler />}
    </div>
  );
}
