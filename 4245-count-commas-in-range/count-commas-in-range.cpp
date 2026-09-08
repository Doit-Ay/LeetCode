class Solution {
public:
    int countCommas(int n) {
        long long ans = 0;
        long long start = 1000;
        int commas = 1;

        while (start <= n) {
            long long end = start * 1000 - 1;
            long long cnt = min((long long)n, end) - start + 1;

            ans += cnt * commas;

            start *= 1000;
            commas++;
        }

        return (int)ans;
    }
};