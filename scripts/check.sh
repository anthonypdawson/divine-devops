for fa in _posts/*; do

    highest_pm=0

    for fb in _future/*; do

    num_identical_lines=$(diff --unchanged-group-format='%<' --old-group-format='' --new-group-format='' --changed-group-format='' "$fa" "$fb" | wc -l)
    num_lines_file_a=$(wc -l < "$fa")

    # save permille of matching lines
    pm=$((1000*num_identical_lines/num_lines_file_a))

    # compare with highest permille
    if [ $pm -gt $highest_pm ]; then
        highest_pm=$pm
        best_match="$fb"
    fi

    done

    # output
    [ $highest_pm -gt 50 ] \
    && printf "File %s best matches File %s with %d %% of identical lines.\n" "$fa" "$best_match" $((highest_pm/10)) \
    || printf "File %s has no match\n" "$fa"

done
