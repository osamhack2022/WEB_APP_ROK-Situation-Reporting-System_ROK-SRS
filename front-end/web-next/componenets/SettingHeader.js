import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Button, PageHeader, Breadcrumb } from 'antd';

export default function SettingHeader(props) {
  const router = useRouter();
  const currentPath = router.pathname;

  const routeTitle = {
    '/settings': '계정 설정',
    '/settings/unit': '부대 설정',
    '/settings/reportsystem': '보고체계 설정'
  };

  const selectStyle = useCallback((isSelected) => (
    isSelected ? { color: 'black', cursor: 'pointer' } : {}
  ));

  return (
  <PageHeader
    className="site-page-header"
    style={{
      backgroundColor: "white",
      boxShadow: 'inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)'
    }}
    title={routeTitle[currentPath]}
    breadcrumb={
      <Breadcrumb>
        {
          Object.entries(routeTitle).map((entry) => (
            <Breadcrumb.Item
              key={entry[1]}
              style={selectStyle(entry[0] == currentPath)}
            >
              <Button
                type="text"
                onClick={() => router.replace(entry[0])}
              >
                {entry[1]}
              </Button>
            </Breadcrumb.Item>
          ))
        }
        <Breadcrumb.Item>
          <Button style={{ display: 'none' }}>Null</Button>
        </Breadcrumb.Item>
      </Breadcrumb>
    }
    extra={props.extra}
  />
  )
}