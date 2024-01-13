import axios from "axios";
import { useQuery } from "react-query";
import { css } from "@emotion/react";

import { color, size } from "@/assets/styles";

export function LogList() {
  const { data: logs } = useQuery([], async () => {
    const { data } = await axios.get<Log[]>("/api/log");

    console.log(data);

    return data;
  });

  if (!logs) {
    return null;
  }

  return (
    <table
      css={css`
        width: 100%;

        border-collapse: collapse;

        white-space: nowrap;
        text-align: center;

        th,
        td {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        thead {
          background-color: ${color.g100};
        }

        tr {
          border-bottom: 1px solid ${color.g200};
        }

        th,
        td {
          padding: 0.375rem 0.5rem;
        }
      `}
    >
      <thead>
        <tr>
          <th></th>
          <th>Date</th>
          <th>ip</th>
          <th>status</th>
          <th>method</th>
          <th>path</th>
          <th>time</th>
        </tr>
      </thead>

      <tbody>
        {logs.map((log) => {
          const { id, ip, method, status, time, path, isLogin, createdAt } =
            log;

          const statusColor =
            status >= 500
              ? "#3865a3"
              : status >= 400
              ? "#e03b24"
              : status >= 300
              ? "#ffcc00"
              : status >= 200
              ? "#64a338"
              : "transparent";

          return (
            <tr key={id}>
              <td>{isLogin === 1 ? "🔑" : "ㅤ"}</td>

              <td>{new Date(createdAt).toLocaleString()}</td>

              <td>{ip}</td>

              <td>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background-color: ${statusColor};

                    border-radius: ${size.BORDER_RADIUS}px;
                  `}
                >
                  <p
                    css={css`
                      color: white;
                      font-size: 0.875rem;
                    `}
                  >
                    {status}
                  </p>
                </div>
              </td>

              <td>{method}</td>

              <td
                css={css`
                  text-align: left;
                `}
              >
                {" "}
                {path.length > 100 ? path.slice(0, 100) + "..." : path}{" "}
              </td>

              <td
                css={css`
                  text-align: right;
                `}
              >{`${time}ms`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
