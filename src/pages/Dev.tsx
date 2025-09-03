import Wrapper from "../components/Wrapper";
// Tip: right-click each component in the left tree → Copy relative path
import DownloadAreaHomeOne from "../components/homes/home-one/DownloadAreaHomeOne";
import InfoAreaHomeOne from "../components/homes/home-one/InfoAreaHomeOne";

const views: Record<string, JSX.Element> = {
    download: <DownloadAreaHomeOne />,
    info: <InfoAreaHomeOne />,
};

export default function Dev() {
    const key = new URLSearchParams(window.location.search).get("c") || "download";
    return <Wrapper>{views[key] ?? <div>Unknown key</div>}</Wrapper>;
}
