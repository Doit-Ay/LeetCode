class Solution {
public:
    struct State {
        int pos;
        int energyLeft;
        int mask;
    };

    int minMoves(vector<string>& classroom, int energy) {
        int m = classroom.size();
        int n = classroom[0].size();
        int cells = m * n;

        vector<vector<int>> litterId(m, vector<int>(n, -1));

        int startPos = -1;
        int litterCnt = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (classroom[i][j] == 'S') {
                    startPos = i * n + j;
                } else if (classroom[i][j] == 'L') {
                    litterId[i][j] = litterCnt++;
                }
            }
        }

        int fullMask = (1 << litterCnt) - 1;

        auto encode = [&](int pos, int e, int mask) {
            return ((mask * cells + pos) * (energy + 1) + e);
        };

        long long totalStates =
            1LL * (1 << litterCnt) * cells * (energy + 1);

        vector<char> vis(totalStates, 0);

        queue<State> q;

        int startMask = 0;
        int startIdx = encode(startPos, energy, startMask);

        vis[startIdx] = 1;
        q.push({startPos, energy, startMask});

        int moves = 0;

        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};

        while (!q.empty()) {
            int sz = q.size();

            while (sz--) {
                auto cur = q.front();
                q.pop();

                if (cur.mask == fullMask)
                    return moves;

                if (cur.energyLeft == 0)
                    continue;

                int r = cur.pos / n;
                int c = cur.pos % n;

                for (int k = 0; k < 4; k++) {
                    int nr = r + dr[k];
                    int nc = c + dc[k];

                    if (nr < 0 || nr >= m || nc < 0 || nc >= n)
                        continue;

                    char cell = classroom[nr][nc];
                    if (cell == 'X')
                        continue;

                    int newEnergy = cur.energyLeft - 1;

                    if (cell == 'R')
                        newEnergy = energy;

                    int newMask = cur.mask;

                    if (cell == 'L') {
                        newMask |= (1 << litterId[nr][nc]);
                    }

                    int newPos = nr * n + nc;
                    int idx = encode(newPos, newEnergy, newMask);

                    if (!vis[idx]) {
                        vis[idx] = 1;
                        q.push({newPos, newEnergy, newMask});
                    }
                }
            }

            moves++;
        }

        return -1;
    }
};