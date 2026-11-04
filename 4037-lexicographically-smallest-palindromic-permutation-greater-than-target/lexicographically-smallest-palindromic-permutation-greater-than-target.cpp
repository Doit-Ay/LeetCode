
class Solution {
public:
    string lexPalindromicPermutation(string s, string target) {
        int n = s.size();
        int len = n / 2;

        vector<int> freq(26, 0);

        for (char c : s) {
            freq[c - 'a']++;
        }

        // Check whether palindrome is possible
        string mid = "";

        for (int i = 0; i < 26; i++) {
            if (freq[i] % 2) {
                if (!mid.empty()) return "";
                mid += char('a' + i);
            }
            freq[i] /= 2;
        }

        // Build palindrome from its first half
        auto build = [&](string half) {
            string rev = half;
            reverse(rev.begin(), rev.end());

            return half + mid + rev;
        };

        string h = target.substr(0, len);

        // Check if target's first half is available
        vector<int> temp = freq;

        bool possible = true;

        for (char c : h) {
            if (--temp[c - 'a'] < 0) {
                possible = false;
                break;
            }
        }

        // Case 1: First half matches target's prefix
        if (possible) {
            string candidate = build(h);

            if (candidate > target) {
                return candidate;
            }
        }

        // Case 2: Find smallest valid half greater than h
        for (int i = len - 1; i >= 0; i--) {

            vector<int> rem = freq;
            bool valid = true;

            // Preserve the prefix before position i
            for (int j = 0; j < i; j++) {
                rem[h[j] - 'a']--;

                if (rem[h[j] - 'a'] < 0) {
                    valid = false;
                    break;
                }
            }

            if (!valid) continue;

            // Find the smallest character greater than h[i]
            for (int c = h[i] - 'a' + 1; c < 26; c++) {

                if (rem[c] == 0) continue;

                rem[c]--;

                string half = h.substr(0, i);
                half += char('a' + c);

                // Append remaining characters in sorted order
                for (int j = 0; j < 26; j++) {
                    half += string(rem[j], char('a' + j));
                }

                return build(half);
            }
        }

        return "";
    }
};
