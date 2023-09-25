function CountryDetail({ label, data }) {
  return (
    <p className="flex gap-2">
      <span className="font-semibold">{label}</span>
      {data}
    </p>
  );
}

export default CountryDetail;
